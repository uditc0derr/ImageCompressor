const path = require("path");
const { compressImage } = require("../utils/imageProcessor");

const uploadImage = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
  
    res.status(200).json({ message: "File uploaded successfully", imageName: req.file.filename }); 
  };

  const fs = require("fs");

  const compressImageHandler = async (req, res) => {
    try {
      const { imageName } = req.params;
      const { quality } = req.query;
  
      if (!quality || isNaN(quality) || quality < 1 || quality > 100) {
        return res.status(400).json({ error: "Invalid quality percentage. Provide a value between 1 and 100." });
      }
  
      const inputPath = path.join(__dirname, "../uploads", imageName);
      const outputPath = path.join(__dirname, "../compressed", `compressed-${imageName}`);
  
      if (!fs.existsSync(inputPath)) {
        return res.status(404).json({ error: "File not found" });
      }
  
      await compressImage(inputPath, outputPath, quality);
  
      console.log("Compressed image saved at:", outputPath); 
  
      res.sendFile(outputPath);
    } catch (error) {
      console.error("Compression Error:", error);
      res.status(500).json({ error: "Error compressing image" });
    }
  };
  

module.exports = { uploadImage, compressImage: compressImageHandler };
