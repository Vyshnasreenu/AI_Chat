
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/extract-files", upload.single("uploadfile"), async (req, res) => {
    console.log(req.file, "req")
    try {
        const dataBuffer = req.file;
        const pdfData = await pdfParse(dataBuffer);
        res.json({ text: pdfData.text });
    } catch (err) {
        console.log(err.message, "errrpr")
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
