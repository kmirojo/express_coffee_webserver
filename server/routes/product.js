const { Router } = require("express");
const { verifyToken, verifyAdminRole } = require("../middlewares/auth");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
} = require("../controllers/product");
const router = Router();

router.get("/products", verifyToken, getProducts);

router.get("/product/:id", verifyToken, getProduct);

router.post("/product", [verifyToken, verifyAdminRole], createProduct);

router.put("/product/:id", [verifyToken, verifyAdminRole], updateProduct);

router.delete("/product/:id", [verifyToken, verifyAdminRole], deleteProduct);

// Find Product
router.get("/products/find/:input", verifyToken, searchProduct);

module.exports = router;
