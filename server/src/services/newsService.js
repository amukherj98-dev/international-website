const axios = require("axios");
const cron = require("node-cron");
const NewsArticle = require("../models/NewsArticle");
const { NEWS_CATEGORY_SLUGS } = require("../constants/categories");

const NEWS_API_URL = "https://newsapi.org/v2/everything";

// Keyword queries per category, tuned for NewsAPI's /everything search.
const CATEGORY_QUERIES = {
  "visa-immigration": '(Ireland) AND (student visa OR IRP OR immigration OR "Stamp 2")',
  accommodation: '(Ireland) AND (student accommodation OR rent OR housing OR digs)',
  employment: '(Ireland) AND (work permit OR employment law OR minimum wage OR "Stamp 2" work)',
  "racism-discrimination": '(Ireland) AND (racism OR discrimination OR hate crime)',
  general: '(Ireland) AND (international students)',
};

function hasApiKey() {
  return Boolean(process.env.NEWS_API_KEY && process.env.NEWS_API_KEY.trim().length > 0);
}

async function fetchAndCacheCategory(category) {
  if (!NEWS_CATEGORY_SLUGS.includes(category)) {
    throw Object.assign(new Error(`Unknown news category: ${category}`), { status: 400 });
  }

  if (!hasApiKey()) {
    console.warn(`[newsService] NEWS_API_KEY not set - skipping live fetch for "${category}"`);
    return { fetched: 0, skipped: true };
  }

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: CATEGORY_QUERIES[category],
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
        apiKey: process.env.NEWS_API_KEY,
      },
      timeout: 10000,
    });

    const articles = response.data?.articles || [];
    let fetched = 0;

    for (const article of articles) {
      if (!article.url || !article.title) continue;
      await NewsArticle.updateOne(
        { url: article.url },
        {
          $set: {
            title: article.title,
            sourceName: article.source?.name || "",
            description: article.description || "",
            publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
            category,
            cachedAt: new Date(),
          },
          $setOnInsert: { hidden: false },
        },
        { upsert: true }
      );
      fetched += 1;
    }

    return { fetched, skipped: false };
  } catch (err) {
    console.error(`[newsService] Failed to fetch category "${category}":`, err.message);
    return { fetched: 0, skipped: true, error: err.message };
  }
}

async function fetchAndCacheAllCategories() {
  const results = {};
  for (const category of NEWS_CATEGORY_SLUGS) {
    results[category] = await fetchAndCacheCategory(category);
  }
  return results;
}

function startNewsScheduler() {
  if (!hasApiKey()) {
    console.warn("[newsService] NEWS_API_KEY not set - scheduler will run but calls will no-op until a key is added.");
  }
  // Refresh every 4 hours; also do an initial fetch shortly after boot.
  cron.schedule("0 */4 * * *", () => {
    fetchAndCacheAllCategories().catch((err) => console.error("[newsService] scheduled fetch failed", err));
  });
  setTimeout(() => {
    fetchAndCacheAllCategories().catch((err) => console.error("[newsService] initial fetch failed", err));
  }, 5000);
}

module.exports = { fetchAndCacheCategory, fetchAndCacheAllCategories, startNewsScheduler, hasApiKey };
