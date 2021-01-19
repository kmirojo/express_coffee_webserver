const { Router } = require("express");
const { verifyToken, verifyAdminRole } = require("../middlewares/auth");
const router = Router();
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category");

router.get("/categories", verifyToken, getCategories);

router.get("/category/:id", verifyToken, getCategory);

router.post("/category", verifyToken, createCategory);

router.put("/category/:id", [verifyToken, verifyToken], updateCategory);

router.delete("/category/:id", [verifyToken, verifyAdminRole], deleteCategory);

module.exports = router;
