const mongoose = require("mongoose");
const { NEWS_CATEGORY_SLUGS } = require("../constants/categories");

const newsArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    sourceName: { type: String, default: "" },
    description: { type: String, default: "" },
    publishedAt: { type: Date },
    category: { type: String, required: true, enum: NEWS_CATEGORY_SLUGS, index: true },
    cachedAt: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

newsArticleSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("NewsArticle", newsArticleSchema);
