//isFilePresent checks if file uploaded or not
//if file is not presnt in req
//if req file is an array and its length is zero(i.e file not uploaded)
//then gives error.

const isFilePresent = (req, res, next) => {
  if (!req.files) {
    return res
      .status(400)
      .json({ description: "File not present in request body." });
  }

  if (Array.isArray(req.files) && req.files.length === 0) {
    console.log(req.files.length);
    return res
      .status(400)
      .json({ error: { description: "No file uploaded." } });
  }
  next();
};

module.exports = { isFilePresent };
