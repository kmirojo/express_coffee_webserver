const { Router } = require("express");
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
} = require("../controllers/user");
const { verifyToken, verifyAdminRole } = require("../middlewares/auth");

const router = Router();

router.get("/users", verifyToken, getUsers);

router.get("/user/:id", verifyToken, getUser);

router.post("/user", [verifyToken, verifyAdminRole], createUser);

router.put("/user/:id", [verifyToken, verifyAdminRole], updateUser);

router.delete("/user/:id", [verifyToken, verifyAdminRole], deleteUser);

module.exports = router;
