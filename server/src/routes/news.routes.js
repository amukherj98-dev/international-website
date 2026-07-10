const express = require("express");
const ctrl = require("../controllers/news.controller");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/admin", verifyAdmin, ctrl.listAdmin);
router.post("/refresh", verifyAdmin, ctrl.refresh);
router.put("/:id/hidden", verifyAdmin, ctrl.setHidden);

module.exports = router;
