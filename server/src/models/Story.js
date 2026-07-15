const mongoose = require("mongoose");
const { GUIDE_CATEGORY_SLUGS } = require("../constants/categories");

const storySchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    origin: { type: String, trim: true },
    programme: { type: String, trim: true },
    arrivalYear: { type: Number },
    body: { type: String, required: true },
    themes: { type: [String], enum: GUIDE_CATEGORY_SLUGS, default: [] },
    featuredQuote: { type: String, required: true },
    displayMode: { type: String, enum: ["reflection", "must-do", "testimonial"], required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    lastVerified: { type: Date },
  },
  { timestamps: true }
);

storySchema.index({ author: "text", body: "text", featuredQuote: "text" });

module.exports = mongoose.model("Story", storySchema);
