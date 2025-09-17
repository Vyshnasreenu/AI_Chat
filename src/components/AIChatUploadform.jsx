import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import './chat.css'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';
import REACT_APP_URL from './constant';

const AIChatUploadform = () => {
  const [jdfile, setJdFile] = useState("Text box")
  const [uploadfile, setUploadFile] = useState();

  const [isLoading, setIsLoading] = useState(false)

  const [jobDesc, setJobDesc] = useState("")


  const [generate, setGenerateQS] = useState("")

  const [errorMsg, setErrorMsg] = useState("")
  const changeJDhandler = (event) => {
    setJdFile(event.target.value)
    setUploadFile("");
    setIsLoading(false)
    setJobDesc("")
    setErrorMsg("")
  }

  const filuploadhandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be less than 5MB")
    }
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    // if ()
    if (!allowedTypes.includes(file.type)) {
      alert("File must be a PDF or DOCX")
    }
    if (file) {
      setUploadFile(file)
    }
  }

  const resumeExtracting = async () => {
    const formdata = new FormData()
    formdata.append("uploadfile", uploadfile)
    try {
      const fileResponse = await axios.post(`${REACT_APP_URL}/Uploadfiles/extract-files`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log(fileResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const onGenerateInterviewQuestions = async () => {
    setIsLoading(true)
    let resumeText = "";
    if (uploadfile) {
      resumeText = await resumeExtracting()
    }
    // try {
    //   const response = await axios.post(`${REACT_APP_URL}/InterviewQuestion/generate`, {
    //     jobDescription: jobDesc,
    //     resume: resumeText,
    //   })
    //   if (response) {
    //     setTimeout(() => {
    //       setGenerateQS(response.data)
    //       setIsLoading(false)
    //       setUploadFile("");
    //       setJobDesc("")
    //     }, 2000);
    //   } else {
    //     setErrorMsg("Failed generate interview questions. Please try again later!")
    //     setIsLoading(false)
    //   }
    // } catch (error) {
    //   setTimeout(() => {
    //     setErrorMsg(error.message)
    //     setIsLoading(false)
    //   }, 2000);
    // }


  }

  const changeJOBDescHandler = (event) => {
    setJobDesc(event.target?.value || "")
  }

  return (
    <React.Fragment>
      <div className="p-2 border m-5">
        <div className="text-center p-2">
          <h3>
            <label>AI Interview Assistant</label>
          </h3>
          <h5 style={{ color: "gray", fontFamily: "initial" }}>
            Genearte tailored interview questions by uploading your resume or job description.
          </h5>
        </div>
        <div className='row border-top p-2 m-2'>
          <div className="text-center">
            <div className="col-12">
              <label id="demo-radio-buttons-group-label"> Upload Job Description/Resume</label>
              <div className="form-group">
                <FormControl component="fieldset" className="">
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={jdfile}
                    onChange={changeJDhandler}
                  >
                    <FormControlLabel value="Text box" label="Text Box" control={<Radio />} />
                    <FormControlLabel value="Upload" label="Upload" control={<Radio />} />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          {jdfile === "Text box" ? (
            <div className=''>
              <textarea
                className='form-control shadow-sm'
                rows={4} placeholder='Please enter job description'
                value={jobDesc}
                onChange={changeJOBDescHandler}
                style={{ fontFamily: "initial" }}
              />
            </div>
          ) : (
            <div>
              {!uploadfile ? (
                <>
                  <div className=' row shadow-sm text-center' style={{ minHeight: "100px", border: "2px dashed blue" }}>
                    <label htmlFor='upload-form' className='p-3'>
                      <UploadFileRoundedIcon className='upload-icon fs-1 ' />
                      <div className="">
                        <b>Click to upload or drag and drop</b>
                      </div>
                      <input
                        type='file'
                        id="upload-form" className='form-control'
                        style={{ opacity: "0" }}
                        onChange={filuploadhandler} />
                    </label>
                  </div>
                  <span>Support Documents : PDFS/DOCS</span>
                </>
              ) : (
                <div className='d-flex justify-content-around  p-2' style={{ minHeight: "50px", border: "2px dashed lightgreen" }}>
                  <div>
                    <label>
                      Selected : {' '}
                      <b>{uploadfile.name}</b></label>
                  </div>
                  <button className='btn text-danger'>X</button>
                </div>
              )}

            </div>
          )}
          <div className="row p-2 mt-2">
            <div className="text-center">
              {!isLoading ? (
                <Button
                  variant="contained"
                  startIcon={<AutoAwesomeIcon />}
                  sx={{
                    background: "linear-gradient(70deg, #e119a0 20.18%,rgba(0, 145, 181, 0.82))",
                    borderRadius: "10px",
                    transition: " width 1s;",
                    textTransform: "none"
                  }}

                  onClick={onGenerateInterviewQuestions}
                >
                  Genearate Interview Questions
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                  sx={{
                    background: "linear-gradient(70deg, #e119a0 20.18%,rgba(0, 145, 181, 0.82))",
                    textTransform: "none",

                    borderRadius: "10px",
                    transition: " width 1s;"
                  }}
                >
                  Generating Interview Questions... Please Wait...
                </Button>
              )}
            </div>
          </div>

          <div className='p-2 border'>
            {errorMsg && (
              <p className='text-danger'>{errorMsg || ""}</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AIChatUploadform