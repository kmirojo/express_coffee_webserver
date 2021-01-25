const { Router } = require("express");
const { getImage } = require("../controllers/images");
const { verifyToken, verifyImgToken } = require("../middlewares/auth");
const router = Router();

router.get("/image/:type/:img", verifyImgToken, getImage);

module.exports = router;
