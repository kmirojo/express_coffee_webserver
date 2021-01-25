const User = require("../models/user");
const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
    const { type, id } = req.params;

    // fileUpload adds the uploaded files inside of {req.files}
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msg: "No files were uploaded.",
        });
    }

    // Validate Type
    const validTypes = ["users", "products"];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: `Allowed types are: ${validTypes.join(", ")}`,
        });
    }

    const { file } = req.files;
    const fileExtention = file.name.split(".").pop();

    // Allowed Extentions
    const validExtentions = ["png", "jpg", "gif", "jpeg"];

    if (!validExtentions.includes(fileExtention)) {
        return res.status(400).json({
            ok: false,
            msg: `Allowed extentions are: ${validExtentions.join(", ")}`,
        });
    }

    // Change File name
    const fileName = `${id}-${new Date().getMilliseconds()}.${fileExtention}`;

    try {
        await file.mv(`./uploads/${type}/${fileName}`);

        if (type === "users") {
            userImage(id, res, fileName);
        } else {
            productImage(id, res, fileName);
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Put Error: ", error);
    }
};

async function userImage(id, res, fileName) {
    try {
        const user = await User.findById(id);

        deleteFile("users", user.img);

        user.img = fileName;

        await user.save();

        res.json({
            ok: true,
            user,
            img: fileName,
        });
    } catch (error) {
        deleteFile("users", fileName);
        res.statu(500).json({
            ok: false,
            error,
        });
    }
}
async function productImage(id, res, fileName) {
    try {
        const product = await Product.findById(id);

        deleteFile("products", product.img);

        product.img = fileName;

        await product.save();

        res.json({
            ok: true,
            product,
            img: fileName,
        });
    } catch (error) {
        deleteFile("products", fileName);
        res.statu(500).json({
            ok: false,
            error,
        });
    }
}

function deleteFile(type, imgName) {
    const imgPath = path.resolve(__dirname, `../../uploads/${type}/${imgName}`);

    if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath); // Removes the file
    }
}

module.exports = { uploadFile };
