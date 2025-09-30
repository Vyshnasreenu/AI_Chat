
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtToken = process.env.JWT_TOKEN_KEY;// should be same as in authRoutes

async function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.slpit(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    await jwt.verify(token, jwtToken, (err, user) => {
        if (err) {
            return res.json({ error: "Invalid or expired token", status: "403" });
        }
        req.user = user; // attach decoded user info
        next();
    });
}

module.exports = authenticate;
