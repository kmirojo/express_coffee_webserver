const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Evaluates User
        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: "Wrong User or Password",
                },
            });
        }

        // Evaluates Password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: "Wrong User or Password",
                },
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                user,
            },
            process.env.TOKEN_SEED,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error,
        });
        console.log("Post Error: ", error);
    }
};

module.exports = {
    login,
};
