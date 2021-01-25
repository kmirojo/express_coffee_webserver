const express = require("express");
const fileUpload = require("express-fileupload");
const { uploadFile } = require("../controllers/upload");
const app = express();

// fileUpload manage all uploaded files to be set inside {req.files}
app.use(fileUpload({ useTempFiles: true }));

app.put("/upload/:type/:id", uploadFile);

module.exports = app;
