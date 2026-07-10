const express = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/feedback.controller");
const { verifyAdmin } = require("../middleware/auth");
const { feedbackLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

const feedbackValidators = [
  body("message").trim().isLength({ min: 1, max: 300 }).withMessage("Feedback must be 1-300 characters"),
  body("name").optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
];

router.get("/", ctrl.listPublic);
router.post("/", feedbackLimiter, feedbackValidators, ctrl.create);

router.get("/admin", verifyAdmin, ctrl.listAdmin);
router.put("/:id/approve", verifyAdmin, ctrl.approve);
router.put("/:id/reject", verifyAdmin, ctrl.reject);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
