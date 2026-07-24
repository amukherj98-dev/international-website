const fs = require("fs");
const cron = require("node-cron");
const { google } = require("googleapis");
const GalleryImage = require("../models/GalleryImage");
const { processGalleryImage } = require("../utils/imageProcessor");

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

// Maps a Drive subfolder's display name to a guide category slug, so photos
// organized into category-named subfolders show up on that category's guide
// page rather than the generic homepage-staircase gallery. Matched case- and
// punctuation-insensitively, with a couple of known real-world spelling
// variants listed explicitly (e.g. singular "Eat" vs. the site's "Eats").
const FOLDER_NAME_TO_CATEGORY = {
  "before you leave": "before-you-leave",
  "getting started": "getting-started",
  "visa immigration": "visa-immigration",
  accommodation: "accommodation",
  "health insurance": "health-insurance",
  "banking money": "banking-money",
  transport: "transport",
  "phone connectivity": "phone-connectivity",
  "working part time": "working-part-time",
  "food groceries cheap eats": "food-groceries",
  "food groceries and cheap eat": "food-groceries",
  "food groceries and cheap eats": "food-groceries",
  "people in ireland": "people-in-ireland",
  "dos donts your rights": "dos-donts-rights",
  "community social life": "community-social",
  "activities getting out of the city": "activities",
  "safety emergencies": "safety-emergencies",
  "university support services": "university-support",
};

function normalizeFolderName(name) {
  return name
    .toLowerCase()
    .replace(/'/g, "") // "don't" -> "dont", not "don t" - apostrophes join, other punctuation separates
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function resolveCategoryFromFolderName(name) {
  return FOLDER_NAME_TO_CATEGORY[normalizeFolderName(name)] || null;
}

// The service account key is a secret with real read access to the owner's
// Drive - never committed to the repo. Prefer the raw JSON in an env var
// (works on hosts with no persistent disk, like Render); fall back to a local
// key file for development convenience.
function loadCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH && fs.existsSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH)) {
    return JSON.parse(fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH, "utf8"));
  }
  return null;
}

function isConfigured() {
  return Boolean(FOLDER_ID && loadCredentials());
}

let driveClient;
function getDriveClient() {
  if (driveClient) return driveClient;
  const credentials = loadCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

async function listChildren(drive, folderId) {
  const files = [];
  let pageToken;
  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
      pageSize: 100,
      pageToken,
    });
    files.push(...(res.data.files || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return files;
}

// Walks the root folder one level deep: image files directly in the root have
// no category; image files inside a subfolder are tagged with that
// subfolder's matching category (or skipped with a warning if the subfolder
// name doesn't match any known category).
async function listCategorizedFiles(drive) {
  const rootChildren = await listChildren(drive, FOLDER_ID);
  const files = [];

  for (const child of rootChildren) {
    if (child.mimeType === FOLDER_MIME_TYPE) {
      const category = resolveCategoryFromFolderName(child.name);
      if (!category) {
        console.warn(`[driveSyncService] Subfolder "${child.name}" doesn't match any known category - skipping.`);
        continue;
      }
      const subChildren = await listChildren(drive, child.id);
      for (const f of subChildren) {
        if (IMAGE_MIME_TYPES.includes(f.mimeType)) files.push({ ...f, category });
      }
    } else if (IMAGE_MIME_TYPES.includes(child.mimeType)) {
      files.push({ ...child, category: undefined });
    }
  }

  return files;
}

async function downloadFile(drive, fileId) {
  const res = await drive.files.get({ fileId, alt: "media" }, { responseType: "arraybuffer" });
  return Buffer.from(res.data);
}

async function nextAlternatingSide() {
  const count = await GalleryImage.countDocuments({});
  return count % 2 === 0 ? "left" : "right";
}

async function syncGalleryFromDrive() {
  if (!isConfigured()) {
    console.warn("[driveSyncService] GOOGLE_DRIVE_FOLDER_ID or service account key not set - skipping sync.");
    return { synced: 0, skipped: true };
  }

  const drive = getDriveClient();
  const files = await listCategorizedFiles(drive);
  const seenFileIds = new Set(files.map((f) => f.id));
  let created = 0;
  let updated = 0;

  for (const file of files) {
    const modifiedTime = new Date(file.modifiedTime);
    const existing = await GalleryImage.findOne({ driveFileId: file.id }).select("+driveFileId +driveModifiedAt");

    if (existing) {
      const changed = !existing.driveModifiedAt || existing.driveModifiedAt.getTime() !== modifiedTime.getTime();
      if (changed) {
        const buffer = await downloadFile(drive, file.id);
        const { webpData, jpegData } = await processGalleryImage(buffer);
        existing.webpData = webpData;
        existing.jpegData = jpegData;
        existing.driveModifiedAt = modifiedTime;
        existing.lastSyncedAt = new Date();
        existing.missingFromSource = false;
        if (file.category) existing.category = file.category;
        await existing.save();
        updated += 1;
      } else if (existing.missingFromSource) {
        existing.missingFromSource = false;
        existing.lastSyncedAt = new Date();
        await existing.save();
      }
      continue;
    }

    const buffer = await downloadFile(drive, file.id);
    const { webpData, jpegData } = await processGalleryImage(buffer);
    try {
      await GalleryImage.create({
        webpData,
        jpegData,
        alt: file.name.replace(/\.[^/.]+$/, ""),
        side: await nextAlternatingSide(),
        category: file.category,
        sourceType: "google-drive",
        driveFileId: file.id,
        driveModifiedAt: modifiedTime,
        lastSyncedAt: new Date(),
        isActive: true,
      });
      created += 1;
    } catch (err) {
      // A concurrent sync run (e.g. overlapping cold-starts) already created
      // this file's document between our findOne check and this create call -
      // the unique index on driveFileId caught it. Not an error: the other
      // run's document is authoritative, so just skip.
      if (err.code === 11000) {
        console.warn(`[driveSyncService] Skipped duplicate create for driveFileId ${file.id} (concurrent sync already created it).`);
      } else {
        throw err;
      }
    }
  }

  // Files that were synced before but no longer appear in the folder listing:
  // flag rather than delete (see photo-staircase-spec.md Section 5).
  const driveSourced = await GalleryImage.find({ sourceType: "google-drive" }).select("+driveFileId");
  let flaggedMissing = 0;
  for (const doc of driveSourced) {
    if (!seenFileIds.has(doc.driveFileId) && !doc.missingFromSource) {
      doc.missingFromSource = true;
      doc.isActive = false;
      await doc.save();
      flaggedMissing += 1;
    }
  }

  console.log(
    `[driveSyncService] Sync complete: ${created} new, ${updated} updated, ${flaggedMissing} flagged missing.`
  );
  return { created, updated, flaggedMissing, skipped: false };
}

function startDriveSyncScheduler() {
  if (!isConfigured()) {
    console.warn("[driveSyncService] Not configured - scheduler will run but sync will no-op until credentials/folder ID are set.");
  }
  // Every 30 minutes, plus an initial sync shortly after boot.
  cron.schedule("*/30 * * * *", () => {
    syncGalleryFromDrive().catch((err) => console.error("[driveSyncService] scheduled sync failed", err.message));
  });
  setTimeout(() => {
    syncGalleryFromDrive().catch((err) => console.error("[driveSyncService] initial sync failed", err.message));
  }, 8000);
}

module.exports = { syncGalleryFromDrive, startDriveSyncScheduler, isConfigured };
