const Guide = require("../models/Guide");
const Neighbourhood = require("../models/Neighbourhood");
const NewsArticle = require("../models/NewsArticle");
const Submission = require("../models/Submission");
const Story = require("../models/Story");

async function search(req, res, next) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.json({ guides: [], neighbourhoods: [], news: [], submissions: [], stories: [] });
    }

    const textFilter = { $text: { $search: q } };

    const [guides, neighbourhoods, news, submissions, stories] = await Promise.all([
      Guide.find(textFilter).limit(15),
      Neighbourhood.find(textFilter).limit(15),
      NewsArticle.find({ ...textFilter, hidden: false }).limit(15),
      Submission.find({ ...textFilter, status: "approved" }).limit(15),
      Story.find({ ...textFilter, status: "published" }).limit(15),
    ]);

    res.json({ guides, neighbourhoods, news, submissions, stories });
  } catch (err) {
    next(err);
  }
}

module.exports = { search };
