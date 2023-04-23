import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'


function Editclinicprofile() {
    const [name, pickName] = useState("");
    const [email, pickEmail] = useState("");
    const [mobile, pickMobile] = useState("");
    const [password, pickPassword] = useState("");
    const [city, pickCity] = useState("");
    const [address, pickAddress] = useState("");
    const [pincode, pickPincode] = useState("");
    const [state, pickState] = useState("");
    const [active, pickActive] = useState("");
    const [message, updateMessage] = useState("");

    const getClinicdetails = () => {
        let input = { 
            "hospitalid": localStorage.getItem("hospitalid"),
    };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Hospital/details', requestOptions)
            .then(response => response.json())
            .then(data => {
                // if (data.length > 0) {
                    pickName(data.name);
                    pickActive(data.active);
                    pickMobile(data.mobile);
                    pickEmail(data.email);
                    pickCity(data.city);
                    pickAddress(data.address);
                    pickPassword(data.password);
                    pickState(data.state);
                    pickPincode(data.pincode);
                // }
            });
    }
    useEffect(()=>{
        getClinicdetails()
    },[1])

    const updateClinic=()=>{
        let input={ 
            "name": name,
            "email": email,
            "mobile": mobile,
            "city": city,
            "address": address,
            "pincode": pincode,
            "state": state,
            "active": active,
            "password": password,
            "hospitalid": localStorage.getItem("hospitalid")
             };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };
            fetch('https://www.medicalplanet.in/webapi/Hospital/update', requestOptions)
            .then(response => response.text())
            .then(data =>{
                updateMessage(data); 
            });
    }
    return (
        <div className="container">
            <div className="row mt-4">
                <h3 className="text-center text-info">Edit Clinic Details</h3>
                <p className="text-center text-danger">{message}</p>
                <div className="col-lg-4 mt-1">
                    <div className="mt-2">
                        <label>Clinic Name</label>
                        <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} value={name} />
                    </div>
                    {/* <div className="mt-2">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={obj => pickPassword(obj.target.value)} value={password} />
                    </div> */}
                    <div className="mt-2">
                        <label>Address</label>
                        <input type="text" className="form-control" onChange={obj => pickAddress(obj.target.value)} value={address} />
                    </div>
                    <div className="mt-2">
                            <label>State</label>
                            <input type="text" className="form-control" onChange={obj => pickState(obj.target.value)} value={state} />
                        </div>

                </div>

                <div className="col-lg-4 mt-1">
                    <div className="mt-2">
                        <label>Mobile</label>
                        <input type="number" className="form-control" onChange={obj => pickMobile(obj.target.value)} value={mobile} />
                    </div>
                    <div className="mt-2">
                        <label>Active</label>
                        <select className="form-select" onChange={obj => pickActive(obj.target.value)} value={active}>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                      
                    </div>
                </div>

                <div className="col-lg-4 mt-1">
                    {/* <div className="mt-2">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={obj => pickEmail(obj.target.value)} value={email} />
                    </div> */}
                    <div className="mt-2">
                        <label>City</label>
                        <input type="text" className="form-control" onChange={obj => pickCity(obj.target.value)} value={city} />
                    </div>


                    <div className="mt-2">
                        <label>Pincode</label>
                        <input type="number" className="form-control" onChange={obj => pickPincode(obj.target.value)} value={pincode} />
                    </div>
                </div>
            </div>
            <div className="mt-3 text-center">
                <button className="btn btn-primary mx-2 rounded shadow" onClick={updateClinic}> <i className="fa fa-save"></i> Update</button>
                <Link className="btn btn-primary rounded shadow" to='/clinic'> <i className="fa fa-save"></i> Back</Link>
            </div>
        </div>
    )
}

export default Editclinicprofile