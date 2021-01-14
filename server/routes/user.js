const { Router } = require("express");
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/users", getUsers);

router.get("/user/:id", (req, res) => {
    res.json({ res: "Get User!" });
});

router.post("/user", createUser);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

module.exports = router;
