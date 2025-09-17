
const OpenAI = require("openai");
const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const callOpenAIGenerateQuestion = async (systemPromt, userPromt) => {
    const chatCompletion = await openAi.chat.completions.create({
        model: "gpt-5",
        messages: [
            { role: "system", content: systemPromt },
            { role: "user", content: userPromt }
        ]
    })
    const response = chatCompletion.data.choices[0].message.content
    return response;
}

module.exports = { callOpenAIGenerateQuestion }