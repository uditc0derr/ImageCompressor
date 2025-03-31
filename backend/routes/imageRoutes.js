const express = require("express");
const { uploadImage, compressImage } = require("../controllers/imageController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/compress/:imageName", compressImage);

module.exports = router;
