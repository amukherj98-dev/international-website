const express = require("express");
const ctrl = require("../controllers/stories.controller");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.listPublic);
router.get("/admin", verifyAdmin, ctrl.listAdmin);
router.get("/:id", ctrl.getById);
router.post("/", verifyAdmin, ctrl.create);
router.put("/:id", verifyAdmin, ctrl.update);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
