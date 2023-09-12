import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login(){
    const [formData, setFormData] = useState({
        email: '', 
        password: '' 
    });
    const navigate = useNavigate();
    const [APIData , setAPIData] = useState([]);
    const [Authuser , setAuthuser] = useState({});
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
    function handleAuthUser(userData){
        const AuthUser = userData.filter(function(item){
            return item.email == formData.email && item.password == formData.password;
        });
        // console.log(AuthUser);
        if(Object.keys(AuthUser).length !== 0){
            navigate('/');
        }
        else{
            setErrors('Email or Password is wrong!!');
        }
    }
    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)} className="container mt-5">
                {error && <div className="text-danger">{error}</div>}
                <div className="form-outline mb-4">
                    <input type="email" id="email" name="email" value={formData.email}  onChange={e => handleChange(e)} className="form-control" />
                    <label className="form-label" htmlFor="form2Example1">
                        Email address
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="password" name="password" value={formData.password} onChange={e => handleChange(e)} className="form-control" />
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                </div>
                {/* <div className="row mb-4">
                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div> */}
                <button type="submit" className="btn btn-dark btn-block mb-4">
                    Log in
                </button>
                <div className="text-center">
                    <p>
                        Not a member? <a href="#!">Register</a>
                    </p>
                </div>
            </form>
        </div>
    )
}