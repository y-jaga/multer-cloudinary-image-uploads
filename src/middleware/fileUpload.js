const multer = require("multer");
const path = require("path");
const { fileTypeValidator } = require("../utils/fileTypeValidator.js");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file.js");

//In storage:-
//In destination:- we mentioned and created the folder "uploads" in which our images will stored after uploading them.
//In filename:- we mentioned the name of file given when they are stored in uploads
//name will be (curr data + curr time(till secs) + extension name of file)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//In upload:-
//we defined the storage where uploaded file will be stored(i.e. :storage upload folder)
//isFileTypeAllowed checks with fileTypeValidator(file) function is file is of valid type
//if true returns standard syntax fo success
//if false returns error by createing a new multer error instance and message (UNEXPECTED_FILE_TYPE) from file.js
//In array("file", 1), here file is the name of from field comming from frontend and we limit the uploading to 1 in 1 sumbmission.
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isFileTypeAllowed = fileTypeValidator(file);
    if (isFileTypeAllowed) {
      return cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          UNEXPECTED_FILE_TYPE.code,
          UNEXPECTED_FILE_TYPE.message
        )
      );
    }
  },
}).array("file", 1);

module.exports = {  upload  };
