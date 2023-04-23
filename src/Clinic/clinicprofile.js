import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

function Clinicprofile() {

    const [clinicprofile, updateClinicprofile] = useState([]);

    const getClinicprofile = () => {
        let input = { "hospitalid": localStorage.getItem("hospitalid") };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Hospital/details', requestOptions)
            .then(response => response.json())
            .then(data => {
                updateClinicprofile(data);
            });
    }

    useEffect(() => {
        getClinicprofile();
    }, [true])
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-12">
                    <h3 className='text-info text-center mb-4'>Clinic Details</h3>
                    <table  className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Clinic Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Password</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{clinicprofile.name}</td>
                                <td>{clinicprofile.email}</td>
                                <td>{clinicprofile.mobile}</td>
                                <td>{clinicprofile.password}</td>
                                <td>{clinicprofile.address}, {clinicprofile.city}, {clinicprofile.state}, {clinicprofile.pincode}</td>
                                <td><Link className='btn btn-primary btn-sm' to='/eclinic'>Edit</Link></td>
                                
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Clinicprofile