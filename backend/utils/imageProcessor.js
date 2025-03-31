const sharp = require("sharp");

const compressImage = async (inputPath, outputPath, quality) => {
  return sharp(inputPath)
    .resize(800) 
    .jpeg({ quality: parseInt(quality) }) 
    .toFile(outputPath);
};

module.exports = { compressImage };
