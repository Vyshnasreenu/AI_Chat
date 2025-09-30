

const router = require("express").Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config();
const jwtToken = process.env.JWT_TOKEN_KEY;

const usersList = [];
router.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = usersList.find((user) => user.username === username && (user.email === email));
    if (existingUser) {
        res.json({
            errorMsg: "User already exists. Please Login",
            success: false,

        })
    } else {

        const hashPassword = await bcrypt.hash(password, 10)
        usersList.push({
            username, email, password: hashPassword
        })
        res.status(200).json({
            success: true,
            message: "Account is created successfully."
        })
    }
})


router.post("/login", async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = usersList.find((user) => (user.username === username));
    if (!existingUser) {
        res.json({
            errorMsg: "Invalid credential",
            success: false,

        })
    }
    const isCheck = await bcrypt.compare(password, existingUser.password)
    if (!isCheck) {
        console.log("first")
        res.json({
            errorMsg: "Invalid credential",
            success: false,

        })
    }
    const token = await jwt.sign({ username }, jwtToken, { expiresIn: "1m" })
    res.json({
        message: "Login Successfully",
        token,
        success: true,
    })
})

module.exports = router;