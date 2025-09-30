import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate("");

    const APP_URL = process.env.REACT_APP_BASE_URL;
    const [formContainer, setFormContainer] = useState({
        username: "", password: "",
    })

    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const onChangeHandler = (event, name) => {
        const { value } = event.target
        const newFormContainer = { ...formContainer };
        newFormContainer[name] = value || ''
        setFormContainer(newFormContainer)
    }
    const registerHandler = async () => {
        // console.log(formContainer)

        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // let mail = "test@example.com";
        if (formContainer.username === "" && formContainer.password === "") {
            alert("Please fill all required fields")
            return;
        }
        if (formContainer.username === "") {
            alert("Invalid username/email address");
            return;
        }
        else {
            const response = await axios.post(`${APP_URL}/auth/login`, {
                username: formContainer.username,
                password: formContainer.password
            })
            if (response.data?.success) {
                setSuccessMsg(response.data?.message)
                localStorage.setItem("token", response.data?.token)
                setTimeout(() => {
                    navigate("/dash")
                }, 1000);
                setErrorMsg("")
            } else {
                setErrorMsg(response.data?.errorMsg)
                setSuccessMsg("")
            }
        }
    }

    return (
        <div>
            <div
                style={{
                    border: "1px solid black",
                    height: "100vh",
                    color: "white",
                    background: "black",
                    alignContent: "center"
                }}
            >
                <div className="border overflow-hidden">
                    <h2>JWT Authentication Form</h2>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 text-start">
                            <div className=" mb-2">
                                <label>
                                    User Name
                                </label>
                                <input type='text' className='form-control shadow-sm'
                                    value={formContainer.username}
                                    name='username'
                                    onChange={(event) => onChangeHandler(event, "username")}
                                    required
                                />
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4" />
                        <div className="col-md-4 text-start">
                            <div className="form-group mb-2">
                                <label >
                                    Password
                                </label>
                                <input type='password' className='form-control shadow-sm'
                                    value={formContainer.password}
                                    name='password'
                                    required
                                    onChange={(event) => onChangeHandler(event, "password")}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="text-center">
                        <button type='submit' className='btn btn-success' onClick={registerHandler}>Login</button>
                    </div>
                    {/* <span >Do you have an account
                    </span>
                    <Link to="/login" className='' >Login</Link> */}
                    <p className='text-success'>{successMsg}</p>
                    <p className='text-danger'>{errorMsg}</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage