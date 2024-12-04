const { uploadToCloudinary } = require("../config/cloudinary.js");
const fs = require("fs");

// cloudinaryUpload() calls uploadToCloudinary() that uploads a file to Cloudinary
// and then cloudinaryUpload() removes  the local copy of the file after it has been successfully uploaded.

const cloudinaryUpload = async (file) => {
  try {
    const cloudinaryResponse = await uploadToCloudinary(file.path);

    //fs.unlink removes file from file.path(i.e uploads folder) after uploading them on cloudinary folder.

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return cloudinaryResponse;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { cloudinaryUpload };
