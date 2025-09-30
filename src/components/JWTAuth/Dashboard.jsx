import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const APP_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const onBackwardHandler = () => {
        navigate("/")
    }

    const token = localStorage.getItem("token")
    console.log(token)
    useEffect(() => {
        async function fetchingDashboard() {
            const response = await axios.get(`${APP_URL}/dashboard`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` // attach token here
                }
            })
            if (response) {
                setUser(response.data)
            }
            if (response.data?.status === "403") {
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        fetchingDashboard();
    }, [token])

    console.log(user)
    return (
        <div
            style={{
                border: "1px solid black",
                height: "100vh",
                color: "green",
                background: "whitesmoke",
                alignContent: "center"
            }}
        >
            <h3>{user?.message}!!!</h3>
            <Button variant='contained' onClick={onBackwardHandler}>Back</Button>
        </div>
    )
}

export default Dashboard