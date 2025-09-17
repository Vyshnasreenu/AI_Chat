const express = require("express");
const { callOpenAIGenerateQuestion } = require("../Services/OpenAI");

const router = express.Router();

router.post("/generate", async (request, res, next) => {
    const { jobDescription, resume } = request.body
    const prompt = `
  You are an interview assistant. Based on this Resume/Job Description:
  ${resume || jobDescription}


  Generate 5 interview questions with short sample answers.
  `;
    try {
        const response = await callOpenAIGenerateQuestion(prompt)
        console.log(response)
        res.send("Interview question will generate coming soon...")
    } catch (error) {
        next(error)
    }
})

module.exports = router