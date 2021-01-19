const jwt = require("jsonwebtoken");

// =========================
// Verify Token
// =========================

const verifyToken = async (req, res, next) => {
    // req.get("token") → Gets the token from the headers as {req.headers.token}
    const token = req.get("token");

    try {
        const verifiedUser = await jwt.verify(token, process.env.TOKEN_SEED);

        // Assign user to request
        req.user = verifiedUser.user;

        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({
                ok: false,
                err: { message: error },
            });
        } else {
            res.status(500).json({
                ok: false,
                err: { message: error },
            });
        }
    }
};

// =========================
// Verify AdminRole
// =========================

const verifyAdminRole = (req, res, next) => {
    const { user } = req;

    if (user.role === "ADMIN_ROLE") {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: { message: "User is not an admin" },
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdminRole,
};
