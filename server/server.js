require("./config/config");
const express = require("express");
const app = express();
const dbConnection = require("./database");
const path = require('path');

const PORT = process.env.PORT;

// Middlewares ----------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Public Static Folder
app.use(express.static(path.join(__dirname, "../public")));

// Routes ----------------------------------------------------------
app.use(require("./routes/index"));

// Connect to DB ----------------------------------------------------------
dbConnection();
// Run Server ----------------------------------------------------------
app.listen(PORT, () => {
    console.log("Running on port =", PORT);
});
