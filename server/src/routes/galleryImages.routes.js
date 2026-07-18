const express = require("express");
const multer = require("multer");
const ctrl = require("../controllers/galleryImages.controller");
const { verifyAdmin } = require("../middleware/auth");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
});

const router = express.Router();

router.get("/", ctrl.listPublic);
router.get("/admin", verifyAdmin, ctrl.listAdmin);
router.get("/:id/:format", ctrl.getFile);
router.post("/", verifyAdmin, upload.single("image"), ctrl.create);
router.put("/:id", verifyAdmin, upload.single("image"), ctrl.update);
router.delete("/:id", verifyAdmin, ctrl.remove);

module.exports = router;
