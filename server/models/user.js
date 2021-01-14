const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} is not a valid role",
};

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        img: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: "USER_ROLE",
            enum: validRoles,
        },
        status: {
            type: Boolean,
            default: true,
        },
        google: {
            type: Boolean,
            default: false,
        },
    },
    {
        // versionKey: false,
        timestamps: true, //→ CreatedAt & UpdatedAt
    }
);

// Remove properties from response (E.g: remove Password but only from the user's answer);
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = model("User", userSchema);
