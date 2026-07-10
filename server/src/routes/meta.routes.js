const express = require("express");
const {
  GUIDE_CATEGORIES,
  NEWS_CATEGORIES,
  SUBMISSION_CATEGORIES,
} = require("../constants/categories");

const router = express.Router();

router.get("/categories", (req, res) => {
  res.json({ guideCategories: GUIDE_CATEGORIES, newsCategories: NEWS_CATEGORIES, submissionCategories: SUBMISSION_CATEGORIES });
});

module.exports = router;
