import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

function Doctorprofile() {
    const [doctorprofile, updateDoctorprofile] = useState([])
    const getDoctorprofile = () => {
        let input = { "doctorid": localStorage.getItem("id")};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/viewprofile', requestOptions)
            .then(response => response.json())
            .then(data => {
                updateDoctorprofile(data);
                
            });
    }

    useEffect(() => {
        getDoctorprofile();
    }, [true])
    return (
        <div className="container">
            <div className="row mt-5">

                <div className="col-lg-10 text-black  offset-1 p-3 rounded bg-white">
                    <div className="row m-4 mb-5">
                    <h3 className="text-center text-info"><u>Doctor Details</u></h3>
                        <div className="col-lg-6">
                            <table cellpadding="10px"  className='cell'>
                                <tr>
                                    <th><h5> Name :</h5></th>
                                    <td><h5>{doctorprofile.name}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Specialization :</h5></th>
                                    <td><h5>{doctorprofile.speciality}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Education :</h5></th>
                                    <td><h5>{doctorprofile.education}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Experience :</h5></th>
                                    <td><h5>{doctorprofile.experience}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Mobile :</h5></th>
                                    <td><h5>{doctorprofile.mobile}</h5></td>
                                </tr>
                              
                                <tr>
                                    <th><h5>Address :</h5></th>
                                    <td><h5>{doctorprofile.areaname}, {doctorprofile.address}, {doctorprofile.city}, {doctorprofile.state}, {doctorprofile.pincode}</h5></td>
                                </tr>

                            </table>
                        </div>
                        <div className="col-lg-6">
                        <table cellpadding="10px" className='cell'>
                        <tr>
                                    <th><h5>Email Id :</h5></th>
                                    <td><h5>{doctorprofile.email}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Rating :</h5></th>
                                    <td><h5>{doctorprofile.rating}</h5></td>
                                </tr>
                                <tr>
                                    <th><h5>Profile :</h5></th>
                                    <td><h5>{doctorprofile.profile}</h5></td>
                                </tr>
                                
                                <tr>
                                    <th><h5>Amount :</h5></th>
                                    <td><h5>{doctorprofile.amount}</h5></td>
                                </tr>
                                <tr>
                                    <th><Link className='btn btn-primary btn-sm' to='/edprofile'>Edit</Link></th>
                                    <td></td>
                                </tr>

                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>


    )
}

export default Doctorprofile