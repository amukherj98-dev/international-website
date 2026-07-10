const express = require("express");
const ctrl = require("../controllers/guides.controller");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/:slug", ctrl.getBySlug);
router.post("/", verifyAdmin, ctrl.create);
router.put("/:id", verifyAdmin, ctrl.update);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
