import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin  } from '@react-oauth/google';

import { GoogleOAuthProvider } from '@react-oauth/google';


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [APIData , setAPIData] = useState([]);
    const navigate = useNavigate();
    const [error, setErrors] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:3030/user', {
        })
        .then(response => {
            setAPIData(response.data)
            handleAuthUser(APIData);
        })

    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleOAuthSuccess = (response) => {
        navigate('/');
    };

    const handleOAuthFailure = (error) => {
        console.error('OAuth login failed:', error);
        setErrors('OAuth login failed');
    };

    function handleAuthUser(userData){
        const AuthUser = userData.filter(function(item){
            return item.email == formData.email && item.password == formData.password;
        });
        if(Object.keys(AuthUser).length !== 0){
            navigate('/');
        }
        else{
            setErrors('Email or Password is wrong!!');
        }
    }

    return (
        <section className="vh-100 bg-dark" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black shadow border-0" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            login
                                        </p>
                                        <form onSubmit={e => handleSubmit(e)} className="container mt-5">
                                            {error && <div className="text-danger">{error}</div>}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">
                                                    Email address
                                                </label>
                                                <input type="email" id="email" name="email" value={formData.email}  onChange={e => handleChange(e)} className="form-control" />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <input type="password" id="password" name="password" value={formData.password} onChange={e => handleChange(e)} className="form-control" />
                                            </div>
                                            <button type="submit" className="btn btn-dark btn-block mb-4">
                                                Log in
                                            </button>
                                            <div className="text-center">
                                                <p>
                                                    Not a member? 
                                                    <Link to='/register' type="button" className="ms-1">
                                                        Register
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 text-center">
                                            <div className="text-center">
                                                <p>Or, login with Google:</p>
                                                <GoogleOAuthProvider clientId="850422955809-5qug560ogd291i5ackrra748m0iumvie.apps.googleusercontent.com">
                                                    <GoogleLogin onSuccess={handleOAuthSuccess} onFailure={handleOAuthFailure}/>
                                                </GoogleOAuthProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}