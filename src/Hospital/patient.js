import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Patient() {
    const [patienttlist, updatePatientList] = useState([]);
    const getPatientList = () => {
        let input = {
            "hospitalid":localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/patientforhospital", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    updatePatientList(data);
                }
            })
    }
    useEffect(() => {
        getPatientList()

    },[1])

    const[pDetails, updatepDetails] = useState("");
    // // const [mobile , updateMobile] = useState("");
    // const searchPatient = () =>{
    //     let input = {
    //         "input": pDetails,
    //         // "input": mobile,
    //         "hospitalid":localStorage.getItem("id"),
    //         "id":localStorage.getItem("id")
    //     };
    //     const requestOptions = {
    //         method: 'POST',
    //         header: {'Content-Type' : 'application/json' },
    //         body : JSON.stringify(input)
    //     };
    //     fetch("https://www.medicalplanet.in/webapi/Doctor/searchpatients", requestOptions)
    //     .then(response => response.json())
    //     .then(data =>{
    //         if(data.length>0){
    //             updatePatientList(data);
    //         }else{
    //             updatePatientList([]); 
    //         }
    //     })
    // }

    const clearAll=()=>{
        updatepDetails("")
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4">
                    <h3 className='text-info '>All Patients : {patienttlist.length}</h3>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="input-group">
                        <input type="text" className="form-control" value={pDetails}  placeholder="Mobile No or PID"  onChange={obj=>updatepDetails(obj.target.value)} />
                        {/* <div className="input-group-text"> */}
                            {/* <button className="btn btn-success" type="button" onClick={searchPatient}>Search</button> */}
                            <button className="btn btn-warning" type="button" onClick={clearAll}>Clear</button>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <table className=" table table-bordered">
                        <thead>
                            <tr>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Fee</th>
                                <th>Contact Details</th>
                                <th>Last Visit</th>
                                <th>Fee Paid</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patienttlist.filter((info)=>
                                info.pid.includes(pDetails) ||
                                info.mobile.includes(pDetails) ||
                                info.email.includes(pDetails) 
                            ).map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.pid}</td>
                                            <td>{info.name}</td>
                                            <td>{info.doctorname}</td>
                                            <td>{info.fee}</td>
                                            <td>{info.email}, {info.mobile}</td>
                                            <td>{info.lastvisit}</td>
                                            <td>{info.feepaid}</td>
                                            <td>
                                                <Link className="btn btn-primary btn-sm" to={`/epatient/${info.pid}`}>Pay Now</Link>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Patient