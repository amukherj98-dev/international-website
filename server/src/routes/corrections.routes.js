const express = require("express");
const { body } = require("express-validator");
const ctrl = require("../controllers/corrections.controller");
const { verifyAdmin } = require("../middleware/auth");
const { correctionLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

const correctionValidators = [
  body("contentType").isIn(["Guide", "Neighbourhood", "Story"]).withMessage("Invalid content type"),
  body("contentId").isMongoId().withMessage("Invalid content id"),
  body("note").trim().isLength({ min: 3, max: 500 }).withMessage("Note must be 3-500 characters"),
  body("submitterEmail").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email"),
];

router.post("/", correctionLimiter, correctionValidators, ctrl.create);
router.get("/", verifyAdmin, ctrl.listAdmin);
router.put("/:id/resolve", verifyAdmin, ctrl.resolve);

module.exports = router;
