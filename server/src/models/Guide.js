const mongoose = require("mongoose");
const { GUIDE_CATEGORY_SLUGS } = require("../constants/categories");

const sourceSchema = new mongoose.Schema(
  { label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  { heading: { type: String, required: true }, body: { type: String, required: true } },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, enum: GUIDE_CATEGORY_SLUGS, index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true },
    sections: { type: [sectionSchema], default: [] },
    sources: { type: [sourceSchema], default: [] },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    lastVerified: { type: Date },
  },
  { timestamps: true }
);

guideSchema.index({ title: "text", summary: "text", tags: "text" });

module.exports = mongoose.model("Guide", guideSchema);
