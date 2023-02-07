import React, { useState, useEffect } from 'react'
import "../styles/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import img from '../assets/growsimplee.png'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <nav
                className='nav-home'
                onClick={() => {
                    navigate('/')
                }}
            >
                <img src={img} alt='' className='logo-img' />
            </nav>
            <div className='login-container'>

                <div className="login-title">
                    Login
                </div>
                <div className="login-content">
                    <input type="email" placeholder='Email' onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <input type="text" placeholder='Password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <button className='login-btn btn draw-border' onClick={(e) => {
                        navigate('/')
                    }}>Login</button>
                </div>
            </div>
        </div>

    )
}

export default Login