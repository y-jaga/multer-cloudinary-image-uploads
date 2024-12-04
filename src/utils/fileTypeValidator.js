const path = require("path");

//this function returns true is filetypes matches the /jpeg|jpg|png|gif/
// && if mimetype (e.g:- image/png comes with file being uploaded).
//so it return true if both matches then mentioned fileTypes (/jpeg|jpg|png|gif/)

const fileTypeValidator = (file) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  return extname && mimeType;
};

module.exports = {  fileTypeValidator };
