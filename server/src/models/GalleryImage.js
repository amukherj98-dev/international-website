const mongoose = require("mongoose");

// Render's free tier has no persistent disk - files written to the filesystem
// are lost on every redeploy/restart. So instead of storing paths to files on
// disk, the optimized image bytes are stored directly in MongoDB (Atlas has a
// real persistent disk) and streamed back via a dedicated route. `url` and
// `fallbackUrl` in the public API response are computed from that route, not
// literal file paths - the admin-facing contract otherwise matches the spec.
const galleryImageSchema = new mongoose.Schema(
  {
    webpData: { type: Buffer, required: true },
    jpegData: { type: Buffer, required: true },
    alt: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    order: { type: Number, default: 0 },
    side: { type: String, enum: ["left", "right"], required: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Only one isFeatured:true image should exist - unset any previous one whenever
// a new image is saved as featured, so the admin form can't create two by mistake.
galleryImageSchema.pre("save", async function preSave(next) {
  if (this.isFeatured && this.isModified("isFeatured")) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id }, isFeatured: true },
      { $set: { isFeatured: false } }
    );
  }
  next();
});

galleryImageSchema.pre("findOneAndUpdate", async function preUpdate(next) {
  const update = this.getUpdate();
  if (update && update.isFeatured) {
    const docId = this.getQuery()._id;
    await this.model.updateMany({ _id: { $ne: docId }, isFeatured: true }, { $set: { isFeatured: false } });
  }
  next();
});

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
