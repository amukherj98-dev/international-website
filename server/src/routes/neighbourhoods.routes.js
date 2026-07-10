const express = require("express");
const ctrl = require("../controllers/neighbourhoods.controller");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.post("/", verifyAdmin, ctrl.create);
router.put("/:id", verifyAdmin, ctrl.update);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
