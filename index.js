const express = require("express");
const fs = require("fs");
const { fileRouter } = require("./src/router/fileRouter.js");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

//path.join(__dirname, "uploads"):- append uploads(name of folder where files stored).
// "!fs.existsSync(uploadDir)":- if uploadDir path (i.e path of uploads foleder or uploads folder) doesn't exist
//then create this folder

const uploadDir = path.join(path.resolve(__dirname, "uploads"));
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//when we call "/src/uploads", we will be able to access static(or stored) files from "src/uploads" path.
app.use("/src/uploads", express.static("src/uploads"));

//if we call "/files" them fileRouter.js present in router will be executed to upload the files.
app.use("/files", fileRouter);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
