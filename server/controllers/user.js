const bcrypt = require("bcrypt");
const _ = require("underscore");
const User = require("../models/user");

const getUsers = async (req, res) => {
    // ↓ Route GET Paramas ↓
    // GET param must be ?from=x
    const fromQueryIndex = Number(req.query.from) || 0;
    // GET param must be ?limit=Y
    const queryLimit = Number(req.query.limit) || 0;

    try {
        // E.g User.find({google: true})
        // usersFilter will only return the attributes in the string
        usersFilter = "name email role status google img";
        users = await User.find({}, usersFilter)
            .skip(fromQueryIndex)
            .limit(queryLimit);
        usersCount = await User.countDocuments();

        res.json({
            ok: true,
            users,
            count: usersCount,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
        console.log("Get Error: ", error);
    }
};

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
    });

    try {
        const userDb = await user.save();

        res.json({
            ok: true,
            user: userDb,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
        console.log("Post Error: ", error);
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;

    const body = _.pick(req.body, ["name", "email", "img", "role", "status"]);

    try {
        console.log(body);
        const userDb = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        res.json({
            ok: true,
            user: userDb,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
        console.log("Put Error: ", error);
    }
};

const deleteUser = async (req, res) => {
    let id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndRemove(id);

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                error: "User not found",
            });
        }

        res.json({
            ok: true,
            res: `Delete User, #${id}`,
            deletedUser,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
        });
        console.log("Delete Error: ", error);
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
