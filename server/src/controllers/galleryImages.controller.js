const GalleryImage = require("../models/GalleryImage");
const { processGalleryImage } = require("../utils/imageProcessor");

function toPublicShape(doc, req) {
  const base = `${req.protocol}://${req.get("host")}/api/gallery-images/${doc._id}`;
  return {
    _id: doc._id,
    url: `${base}/webp`,
    fallbackUrl: `${base}/jpeg`,
    alt: doc.alt,
    caption: doc.caption,
    order: doc.order,
    side: doc.side,
    isFeatured: doc.isFeatured,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
  };
}

async function listPublic(req, res, next) {
  try {
    const images = await GalleryImage.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(images.map((img) => toPublicShape(img, req)));
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const images = await GalleryImage.find({}).sort({ order: 1, createdAt: 1 });
    res.json(images.map((img) => toPublicShape(img, req)));
  } catch (err) {
    next(err);
  }
}

async function getFile(req, res, next) {
  try {
    const { format } = req.params;
    if (format !== "webp" && format !== "jpeg") return res.status(404).json({ message: "Not found" });

    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const buffer = format === "webp" ? image.webpData : image.jpegData;
    res.set("Content-Type", format === "webp" ? "image/webp" : "image/jpeg");
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.send(buffer);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: "An image file is required" });
    if (!req.body.alt || !req.body.alt.trim()) return res.status(400).json({ message: "Alt text is required" });
    if (!["left", "right"].includes(req.body.side)) return res.status(400).json({ message: "Side must be 'left' or 'right'" });

    const { webpData, jpegData } = await processGalleryImage(req.file.buffer);

    const image = await GalleryImage.create({
      webpData,
      jpegData,
      alt: req.body.alt.trim(),
      caption: req.body.caption?.trim(),
      order: req.body.order ? Number(req.body.order) : 0,
      side: req.body.side,
      isFeatured: req.body.isFeatured === "true" || req.body.isFeatured === true,
      isActive: req.body.isActive !== "false" && req.body.isActive !== false,
    });

    res.status(201).json(toPublicShape(image, req));
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    if (req.body.alt !== undefined && !req.body.alt.trim()) {
      return res.status(400).json({ message: "Alt text is required" });
    }

    const patch = {};
    if (req.body.alt !== undefined) patch.alt = req.body.alt.trim();
    if (req.body.caption !== undefined) patch.caption = req.body.caption.trim();
    if (req.body.order !== undefined) patch.order = Number(req.body.order);
    if (req.body.side !== undefined) patch.side = req.body.side;
    if (req.body.isFeatured !== undefined) patch.isFeatured = req.body.isFeatured === "true" || req.body.isFeatured === true;
    if (req.body.isActive !== undefined) patch.isActive = req.body.isActive !== "false" && req.body.isActive !== false;

    if (req.file) {
      const { webpData, jpegData } = await processGalleryImage(req.file.buffer);
      patch.webpData = webpData;
      patch.jpegData = jpegData;
    }

    const image = await GalleryImage.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(toPublicShape(image, req));
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPublic, listAdmin, getFile, create, update, remove };
