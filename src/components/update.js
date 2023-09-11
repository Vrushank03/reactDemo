import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Update() {
    const[firstName , setfirstName] = useState('');
    const[lastName  , setlastName]  = useState('');
    const[checkbox  , setcheckbox]  = useState(false);
    const {id} = useParams();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        if (!checkbox) {
            newErrors.checkbox = 'You must agree to the Terms and Conditions';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (id) {
            axios.get(`https://64f5c0012b07270f705d9e54.mockapi.io/fackData/${id}`)
                .then((response) => {
                    setfirstName(response.data.firstName);
                    setlastName(response.data.lastName);
                    setcheckbox(response.data.checkbox);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);
    

    const updateAPIData = () => {
        if(validateForm()){
            axios.put(`https://64f5c0012b07270f705d9e54.mockapi.io/fackData/${id}`, {
                firstName,
                lastName,
                checkbox
            })
            .then((response) => {
                console.log('Update successful', response.data);
                setSubmitted(true);
                navigate('/');

            })
            .catch((error) => {
                console.error('Update failed', error);
            });
        }
    }
    
    return (
        <form>
            <div className='container p-2 m-2 mx-auto'>
                <div className='row g-3'>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            First Name 
                        </label>
                        <input type="text" className="form-control" id="fname" placeholder="Enter your first name..." name='fname' value={firstName} onChange={(e) => setfirstName(e.target.value)}/>
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Last Name 
                        </label>
                        <input type="text" className="form-control" id="lname" placeholder="Enter your last name..." name='lname' value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="checkbox" checked={checkbox}  onChange={(e) => setcheckbox(e.target.checked)}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            I agree to the Terms and Conditions
                        </label>
                        {errors.checkbox && <div className="text-danger">{errors.checkbox}</div>}
                    </div>
                    <button type="button" className="btn btn-dark mt-3 col-1" onClick={updateAPIData}>
                        Save
                    </button>
                    <Link to='/' className='col-1 h-75' type="button">
                        <button  className="btn btn-dark w-100">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}


