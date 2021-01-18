const mongoose = require("mongoose");

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

module.exports = dbConnection;
