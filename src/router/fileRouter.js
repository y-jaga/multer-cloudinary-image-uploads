const multer = require("multer");
const Router = require("express");
const { upload } = require("../middleware/fileUpload.js");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file.js");
const { fileController } = require("../controllers/fileController.js");
const { imageResize } = require("../middleware/imageResize.js");
const { isFilePresent } = require("../middleware/validators/isFilePresent.js");
const authenticateJWT = require("../middleware/authentication.js");

const fileRouter = Router();

//When post request made on route "/uploads" it will call upload = fileUpload.js
//and upload the file in "upload" folder or not if file types is incorrect
//here added error handling if err is an error of multer.MulterError
// then check if err.code === UNEXPECTED_FILE_TYPE.code and retrn the error message as mentioned
//if err is not of type multer.MulterError
//then return a general error message with status 500.

//If file uploaded successfully i.e error not encountered, next() will execute next method i.e. fileController

fileRouter.post(
  "/upload",
  authenticateJWT,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === UNEXPECTED_FILE_TYPE.code) {
          return res.status(400).json({ error: { description: err.field } });
        }
      } else if (err) {
        return res.status(500).json({ error: { description: err.message } });
      }
      next();
    });
  },
  fileController,
  imageResize,
  isFilePresent
);

module.exports = { fileRouter };
