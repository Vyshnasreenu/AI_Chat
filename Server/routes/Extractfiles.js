
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const docsParse = require("mammoth")
const router = express.Router();


// multer() tells Express: “Hey, I want to accept files from forms (like resumes, images, PDFs, etc.).”

// { dest: "uploads/" } → means store the uploaded files temporarily in a folder called uploads / on your server.
// const upload = multer({ dest: "uploads/" });


//Memory storage → instead of saving to disk, keep the file in memory buffer:
//This way, the file isn’t written to disk, but you can directly read it from req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });



router.post("/extract-files", upload.single("uploadfile"), async (req, res) => {
    try {
        let text = "";
        const resumeFile = req.file;
        console.log(req.file)
        if (resumeFile.mimetype === "application/pdf") {
            const pdfData = await pdfParse(resumeFile.buffer);
            text = pdfData.text;
        } else if (resumeFile.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const docData = await docsParse.extractRawText({ buffer: resumeFile.buffer })
            text = docData.value;
        } else {
            res.status(400).json({ error: "Unsupported file type" })
        }
        res.json({ text })
        // res.json({
        //     // id: path.basename(req.file.filename, path.extname(req.file.filename)),
        //     filename: req.file.originalname,
        //     storedFilename: req.file.filename,
        //     mimetype: req.file.mimetype,
        //     size: req.file.size,
        //     uploadTime: Date.now()
        // });
    } catch (err) {
        console.log(err.message, "errrpr")
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
