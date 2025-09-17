const express = require("express");

const router = express.Router();

router.post("/generate", async (request, res, next) => {
    const { jobDescription, resume } = request.body
    console.log(jobDescription, resume)
    // try {
    //     // const response = await callOpenAIGenerateQuestion()
    //     // res.send("Interview question will generate coming soon...")
    // } catch (error) {
    //     next(error)
    // }
})

module.exports = router