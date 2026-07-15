const express = require("express");
const {
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_CLUSTERS,
  NEWS_CATEGORIES,
  SUBMISSION_CATEGORIES,
} = require("../constants/categories");

const router = express.Router();

router.get("/categories", (req, res) => {
  res.json({
    guideCategories: GUIDE_CATEGORIES,
    guideCategoryClusters: GUIDE_CATEGORY_CLUSTERS,
    newsCategories: NEWS_CATEGORIES,
    submissionCategories: SUBMISSION_CATEGORIES,
  });
});

module.exports = router;
