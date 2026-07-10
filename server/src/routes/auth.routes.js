const express = require("express");
const { login, me } = require("../controllers/auth.controller");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyAdmin, me);

module.exports = router;
