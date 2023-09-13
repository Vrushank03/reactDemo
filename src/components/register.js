import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register(){
    const [formData, setFormData] = useState({
        email           : '', 
        password        : '',
        repeatpassword  : '',
        fname           : '',
        lname           : ''
    });
    const navigate = useNavigate();
    const [APIData , setAPIData] = useState([]);
    const [Authuser , setAuthuser] = useState({});
    const [errors, setErrors] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!(formData.fname).trim()) {
            newErrors.fname = 'First Name is required';
        }

        if (!(formData.lname).trim()) {
            newErrors.lname = 'Last Name is required';
        }

        if (!(formData.email).trim()) {
            newErrors.email = 'Password is required';
        }

        if (!(formData.password).trim()) {
            newErrors.password = 'Password is required';
        }

        if (!(formData.repeatpassword).trim()) {
            newErrors.repeatpassword = 'Repeact Password is required';
        }

        setErrors(newErrors);
        if(Object.keys(newErrors).length == 0 && formData.password != formData.repeatpassword){
            newErrors.passwordmismatch = 'The password and repeatpassword must be same!!'
        }
        return Object.keys(newErrors).length === 0;
    };
    function handleSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:3030/user', formData)
            .then(response => {
                navigate('/login');
            })
        }

    }
    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
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
                                            Sign up
                                        </p>
                                        <form onSubmit={e => handleSubmit(e)} className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="fname">
                                                        First Name
                                                    </label>
                                                    <input type="text" id="fname" name="fname" value={formData.fname} onChange={e => handleChange(e)} className="form-control"/>
                                                    {errors.fname && <div className="text-danger">{errors.fname}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="lname">
                                                        Last Name
                                                    </label>
                                                    <input type="text" id="lname" name="lname" value={formData.lname} onChange={e => handleChange(e)} className="form-control"/>
                                                    {errors.lname && <div className="text-danger">{errors.lname}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input type="email" id="email" name="email" value={formData.email} onChange={e => handleChange(e)} className="form-control"/>
                                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="password">
                                                        Password
                                                    </label>
                                                    <input type="password" id="password" name="password" value={formData.password} onChange={e => handleChange(e)} className="form-control"/>
                                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="repeatpassword">
                                                        Repeat Your Password
                                                    </label>
                                                    <input type="password" id="repeatpassword" name="repeatpassword" value={formData.repeatpassword} onChange={e => handleChange(e)} className="form-control"/>
                                                    {errors.repeatpassword && <div className="text-danger">{errors.repeatpassword}</div>}
                                                </div>
                                            </div>
                                            {errors.passwordmismatch && <div className="text-danger">{errors.passwordmismatch}</div>}
                                            <div className="d-flex mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-dark btn-lg">
                                                    Register
                                                </button>
                                            </div>
                                        </form>
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
    )
}