const express = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/submissions.controller");
const { verifyAdmin } = require("../middleware/auth");
const { submissionLimiter } = require("../middleware/rateLimiter");
const { SUBMISSION_CATEGORY_SLUGS } = require("../constants/categories");

const router = express.Router();

const submissionValidators = [
  body("title").trim().isLength({ min: 3, max: 150 }).withMessage("Title must be 3-150 characters"),
  body("body").trim().isLength({ min: 20, max: 5000 }).withMessage("Story must be 20-5000 characters"),
  body("category").isIn(SUBMISSION_CATEGORY_SLUGS).withMessage("Invalid category"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email"),
  body("name").optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
];

router.get("/", ctrl.listPublic);
router.post("/", submissionLimiter, submissionValidators, ctrl.create);

router.get("/admin", verifyAdmin, ctrl.listAdmin);
router.put("/:id/approve", verifyAdmin, ctrl.approve);
router.put("/:id/reject", verifyAdmin, ctrl.reject);
router.put("/:id", verifyAdmin, ctrl.update);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
