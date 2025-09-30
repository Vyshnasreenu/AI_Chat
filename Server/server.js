const express = require("express")
const cors = require("cors");

const InterviewQuestion = require("../Server/routes/QuestionGeneration")
const uploadExtractFiles = require("../Server/routes/Extractfiles")

const JwtRouter = require("./routes/JwtAuthRoute");
const authenticate = require("./middelware/AuthenticationMiddelware");
const app = express();
app.use(express.json())
app.use(cors())

// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 4000;




app.get("/", (req, res) => {
    console.log("express started....")
    res.send("Express server is started...")
})

// Public routes
app.use("/auth", JwtRouter)


// Protected route (only valid JWT users can access)
app.get("/dashboard", authenticate, (req, res, next) => {
    res.json({ message: `Welcome ${req.user.username} to the dashboard` });
})


// Handling middleware routers in sepeartely...
// app.use("/OpenAI/InterviewQuestion", InterviewQuestion)
// app.use("/OpenAI/Uploadfiles", uploadExtractFiles)



app.listen(port, () => {
    console.log(`Express server is running on ${port}`)
})

