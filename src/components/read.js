import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Read(){
    const [APIData , setAPIData] = useState([]);
    const getData = () => {
        axios.get('https://64f5c0012b07270f705d9e54.mockapi.io/fackData')
            .then((response) => {
                setAPIData(response.data);
        })
    }
    const onDelete = (id) => {
        axios.delete(`https://64f5c0012b07270f705d9e54.mockapi.io/fackData/${id}`)
            .then(() => {
                getData();
        })
    }

    useEffect(() => {
        axios.get('https://64f5c0012b07270f705d9e54.mockapi.io/fackData')
            .then((response) => {
                setAPIData(response.data);
            })
    },[])

    return(
        <div className='container p-0 mx-auto'>
            <Link to='/create'>
                <button type="button" className="btn btn-dark mb-2 float-end">
                    Create
                </button>
            </Link>
            <table className="table table-dark table-hover rounded">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>Sr.</th>
                        <th scope="col" className='text-center'>First Name</th>
                        <th scope="col" className='text-center'>Last Name</th>
                        <th scope="col" className='text-center'>Checked</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody> 
                    {APIData.map( data => {
                        return(
                            <tr key={data.id}>
                                <td className='text-center'>{data.id}</td>
                                <td className='text-center'>{data.firstName}</td>
                                <td className='text-center'>{data.lastName}</td>
                                <td className='text-center'>{data.checkbox ? 'Checked' : 'Unchecked'}</td>
                                <td className='text-center'>
                                    <Link to={`/update/${data.id}`}>
                                        <button type="button" className="btn btn-light me-2" >
                                            Update
                                        </button>
                                    </Link>
                                    <button type="button" className="btn btn-light ms-2" onClick={ () => onDelete(data.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}                 
                </tbody>
            </table>
        </div>
    )
}