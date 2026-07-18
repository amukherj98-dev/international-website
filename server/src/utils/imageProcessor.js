const sharp = require("sharp");

// Resizes to display size and produces WebP + JPEG fallback buffers. Applied to
// every gallery image regardless of source condition (already-compressed WhatsApp
// export, camera-original, etc.) - never ship a source file as-is.
async function processGalleryImage(inputBuffer, { maxWidth = 1600 } = {}) {
  const resized = sharp(inputBuffer).rotate().resize({ width: maxWidth, withoutEnlargement: true });

  const [webpData, jpegData] = await Promise.all([
    resized.clone().webp({ quality: 78 }).toBuffer(),
    resized.clone().jpeg({ quality: 78, mozjpeg: true }).toBuffer(),
  ]);

  return { webpData, jpegData };
}

module.exports = { processGalleryImage };
