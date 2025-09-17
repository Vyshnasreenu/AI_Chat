const express = require("express")
const cors = require("cors");

const InterviewQuestion = require("../Server/routes/QuestionGeneration")
const uploadExtractFiles = require("../Server/routes/Extractfiles")
const app = express();
app.use(express.json())
app.use(cors())

// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cors({
//     origin: "http://localhost:3002", // allow React app
//     methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
//     // credentials: true // if you need cookies/auth headers
// }));
const port = process.env.PORT || 4000;


// app.use((err, req, res, next) => {
//     console.error("Error stack:", err.stack);

//     res.status(err.status || 500).json({
//         success: false,
//         error: {
//             message: err.message,
//             status: err.status || 500,
//         },
//     });
// });




app.get("/", (req, res) => {
    console.log("express started....")
    res.send("Express server is started...")
})



app.post("/express/test", (req, res) => {
    // const text = req.body;
    console.log(req.body)
    res.send("Express first method")
})

// Handling middleware routers in sepeartely...
app.use("/OpenAI/InterviewQuestion", InterviewQuestion)
app.use("/OpenAI/Uploadfiles", uploadExtractFiles)



app.listen(port, () => {
    console.log(`Express server is running on ${port}`)
})

