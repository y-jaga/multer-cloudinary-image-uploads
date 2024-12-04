const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imageResize = async (req, res, next) => {
  try {
    if (!req.files || !req.files[0]) {
      return res
        .status(400)
        .json({ error: { description: "No file uploaded" } });
    }
    //originalFilePath takes the path of req file.
    //path.parse takes the necessary details like directory name, file name.
    //outputFilePath contains the file path after resized.
    const originalFilePath = req.files[0].path;
    const parsedPath = path.parse(originalFilePath);
    const outputFilePath = path.join(
      parsedPath.dir,
      "resized-" + parsedPath.name + ".jpeg"
    );

    //resize the image and gives path outputFilePath using ".toFile(outputFilePath)"
    await sharp(originalFilePath)
      .resize({ width: 1500 })
      .jpeg({
        quality: 100,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
        progressive: true,
      })
      .toFile(outputFilePath);

    //Updates req.files[0].path to point to the resized image.
    //Stores the original file path in req.originalFilePath for reference.
    //If no errors occur, the middleware calls next() to proceed to the next middleware or route handler.
    req.files[0].path = outputFilePath;
    req.originalFilePath = originalFilePath;
    next();
  } catch (error) {
    return res.status(500).json({ error: { description: error.message } });
  }
};

module.exports = { imageResize };
