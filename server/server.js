require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT;

// Middlewares ----------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes ----------------------------------------------------------
app.use(require("./routes/user"));

// Connect to DB ----------------------------------------------------------
const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/coffee", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("DB Connection successful");
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error when initializing DB");
    }
};
dbConnection();
// Run Server ----------------------------------------------------------
app.listen(PORT, () => {
    console.log("Running on port =", PORT);
});
