import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import JwtAuthenticationForm from './JwtAuthenticationForm'
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'

const HomePage = () => {
    return (
        <div>
            {/* <BrowserRouter> */}
            <Routes>
                <Route path='/' element={<JwtAuthenticationForm />} />
                <Route path='/dash' element={<Dashboard />} />
                <Route path='/login' element={<LoginPage />} />

            </Routes>
            {/* </BrowserRouter> */}
        </div>
    )
}

export default HomePage