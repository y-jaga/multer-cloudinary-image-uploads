require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");
const crypto = require("crypto");

// Cloudinary configuration
const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary configured...");
};

cloudinaryConfig();

// Generate Cloudinary API signature
const generateSignature = (paramsToSign) => {
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + api_secret)
    .digest("hex");

  return signature;
};

// Upload file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const paramsToSign = { timestamp };
    const signature = generateSignature(paramsToSign);

    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });

    return result;
  } catch (error) {
    console.error({ cloudinary_error: error });
    throw error;
  }
};

module.exports = { uploadToCloudinary };
