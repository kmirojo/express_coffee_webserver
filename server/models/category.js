const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, "It must have a description"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = model("Category", categorySchema);
