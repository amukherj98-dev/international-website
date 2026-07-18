const fs = require("fs");
const path = require("path");
const GalleryImage = require("../models/GalleryImage");
const { processGalleryImage } = require("../utils/imageProcessor");
const galleryImagesData = require("./galleryImagesData");

const PHOTOS_DIR = path.join(__dirname, "..", "..", "..", "client", "src", "assets", "Photos");

async function seedGalleryImages() {
  const count = await GalleryImage.countDocuments();
  if (count > 0) {
    console.log(`GalleryImage collection already has ${count} docs - skipping sample seed.`);
    return;
  }

  const docs = [];
  let order = 1;
  for (const entry of galleryImagesData) {
    const filePath = path.join(PHOTOS_DIR, entry.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`[seedGalleryImages] Missing source file, skipping: ${entry.file}`);
      continue;
    }
    const inputBuffer = fs.readFileSync(filePath);
    const { webpData, jpegData } = await processGalleryImage(inputBuffer);
    docs.push({
      webpData,
      jpegData,
      alt: entry.alt,
      caption: entry.caption,
      side: entry.side,
      isFeatured: !!entry.isFeatured,
      isActive: true,
      order: entry.isFeatured ? 0 : order++,
    });
  }

  if (docs.length === 0) {
    console.log("No source photos found to seed gallery images from - skipping.");
    return;
  }

  await GalleryImage.insertMany(docs);
  console.log(`Seeded ${docs.length} gallery images (processed to WebP/JPEG).`);
}

module.exports = seedGalleryImages;
