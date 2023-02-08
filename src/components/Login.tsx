import React, { useState, useEffect } from 'react'
import "../styles/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import img from '../assets/growsimplee.png'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const username = "adminuser@testmail.com";
    const pasword = "admin";
    localStorage.setItem("email", username);
    localStorage.setItem("password", pasword);
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("password"))
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
                        if (email == localStorage.getItem("email") && password == localStorage.getItem("password")) {
                            localStorage.setItem("token", "success")
                            navigate('/')
                        }
                        else {
                            alert("Invalid Credentials");
                        }
                    }}>Login</button>
                </div>
            </div>
        </div>

    )
}

export default Login