const { cloudinaryUpload } = require("../service/fileService.js");

const fileController = async (req, res) => {
  try {
    //Ensures that the request contains uploaded files.

    if (!req.files) {
      return res.status(400).json({
        error: { description: "File not present in the request body." },
      });
    }

    //if uploaded files array is empty

    if (Array.isArray(req.files) && req.files.length === 0) {
      return res.status(400).json({
        error: { description: "No files uploaded." },
      });
    }
    //Extracts the first file from req.files (it contains an array of uploaded files).
    //Passes the file object to the cloudinaryUpload function, which uploads it to Cloudinary using uploadToCloudinary()

    const file = req.files[0];
    const response = await cloudinaryUpload(file);
    console.log("fileController: ", response);
    res.status(200).json({
      message: "File uploaded successfully, through fileController",
      uploadedResult: response,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fileController };
