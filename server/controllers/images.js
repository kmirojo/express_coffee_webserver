const fs = require("fs");
const path = require("path");
const getImage = (req, res) => {
    const { type, img } = req.params;

    const imgPath = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (fs.existsSync(imgPath)) {
        res.sendFile(imgPath);
    } else {
        const noImgPath = path.resolve(__dirname, "../assets/no-Image.jpg");
        res.sendFile(noImgPath);
    }
};

module.exports = {
    getImage,
};
