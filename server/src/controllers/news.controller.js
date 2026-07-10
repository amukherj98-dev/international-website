const NewsArticle = require("../models/NewsArticle");
const { fetchAndCacheAllCategories, fetchAndCacheCategory, hasApiKey } = require("../services/newsService");

async function list(req, res, next) {
  try {
    const { category, q } = req.query;
    const filter = { hidden: false };
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    const articles = await NewsArticle.find(filter).sort({ publishedAt: -1, cachedAt: -1 }).limit(100);
    res.json({ articles, liveApiConfigured: hasApiKey() });
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const articles = await NewsArticle.find({}).sort({ cachedAt: -1 }).limit(200);
    res.json({ articles, liveApiConfigured: hasApiKey() });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { category } = req.body;
    const results = category ? { [category]: await fetchAndCacheCategory(category) } : await fetchAndCacheAllCategories();
    res.json({ results, liveApiConfigured: hasApiKey() });
  } catch (err) {
    next(err);
  }
}

async function setHidden(req, res, next) {
  try {
    const article = await NewsArticle.findByIdAndUpdate(
      req.params.id,
      { hidden: Boolean(req.body.hidden) },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, listAdmin, refresh, setHidden };
