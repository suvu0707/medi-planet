import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import {sum} from "../Hospital/billings"

function Dashboard() {
    const [doctor, updateDoctor] = useState([]);
    const [staff, updateStaff] = useState([]);
    const [patientList, updatePatientList] = useState([]);
    const [pfee, updatePfee] = useState([]);


    const getDoctors = () => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Hospital/doctorforhospital', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    updateDoctor(data);
                }
            });
    }

    const getAllStaff = () => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id")
        };
        const requestOptions = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/stafflist", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    updateStaff(data);
                }
            })
    }

    const getPatientList = () => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
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

    const getPfee = () => {

        let input = {
            "doctorid": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid"),
            "type": localStorage.getItem("type"),
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/doctor/getpatient", requestOptions)
            .then(response => response.json())
            .then(data => {
                updatePfee(data);
            })
    }
    useEffect(() => {
        getDoctors();
        getAllStaff();
        getPatientList();
        getPfee();
    }, [1])


    const sum = pfee.reduce((total, currentValue) => total = total + parseInt(currentValue.fee), 0);


    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-lg-12">
                    <h2 className='text-center text-primary fontweight'><i className='fa fa-hospital-o'></i> Clinic Dashboard</h2>
                    <div className="row mt-4">

                        <div className="col-lg-2 my-3">
                        <Link className='decoration' to="/bill">
                            <div className="card text-white bg-success">
                                <div className="card-body text-center p-2 rounded shadow border-0">
                                    {/* <i className=" fa fa-rupee fa-2x mb-2"></i> */}
                                    <img src="billing.png" width="45" height="45" className='mb-2' />
                                    <h4>Billings</h4>
                                    <h5 >{sum}</h5>
                                  
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 my-3">
                            <Link className='decoration' to="/doctor">
                                <div className="card  text-white bg-info">
                                    <div className="card-body  text-center p-2 rounded shadow border-0">
                                        {/* <i className="  fa fa-user-md fa-2x mb-2"></i> */}
                                        <img src="doctor.png" width="45" height="45" className='mb-2' /> 
                                        <h4 className="">Doctor</h4>
                                        <h5>{doctor.length}</h5>
                                    </div>
                                </div>
                            </Link>

                        </div>
                        <div className="col-lg-2 my-3">
                            <Link className='decoration' to="/staffs">
                                <div className="card bg-primary text-white">
                                    <div className="card-body text-center p-2 rounded shadow border-0">
                                        {/* <i className="  fa fa-users fa-2x mb-2"></i> */}
                                        <img src="staff.png" width="45" height="45" className='mb-2' /> 
                                        <h4 className=" ">Staffs</h4>
                                        <h5 className="">{staff.length}</h5>


                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 my-3">
                            <Link className='decoration' to="/allpatients">
                                <div className="card staff text-white">
                                    <div className="card-body text-center p-2 rounded shadow border-0" >
                                        {/* <i className="  fa fa-bed fa-2x mb-2"></i> */}
                                        <img src="hospital.png" width="45" height="45" className='mb-2' /> 
                                        <h4 className=" ">Patient</h4>
                                        <h5 className=" ">{patientList.length}</h5>


                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 my-3">
                            <div className="card bg-warning text-white">
                                <div className="card-body text-center p-2 rounded shadow border-0">
                                    {/* <i className=" fa fa-heartbeat fa-2x mb-2"></i> */}
                                    <img src="lab.png" width="45" height="45" className='mb-2' /> 
                                    <h4>Lab Test</h4>
                                    <h5>77</h5>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 my-3">
                        <Link className='decoration' to="/pharma">
                            <div className="card bg-info text-white">
                                <div className="card-body text-center p-2 rounded shadow border-0">
                                    {/* <i className="  fa fa-medkit fa-2x mb-2"></i> */}
                                    <img src="pharma.png" width="45" height="45" className='mb-2' /> 
                                    <h4>Pharma</h4>
                                    <h5>88 <span>Medicine</span></h5>

                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;