import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const DocBookings = () => {
    const [appointments, updateAppointments] = useState([]); //We know that the details are coming as aarray as it have so many data
    const [userone, updateOne] = useState({});  // We only want individual data at a time as a object
    // const [bookingdate, updateBookingdate] = useState("");

    const getDocBookings = () => {
        let input = { 
            "doctorid": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id"),
         };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/getbooking', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.length > 0) {
                    updateAppointments(data); //after fetching data we pass it to a state() in a form of array ,then we show it by using variable in page using map()
                    updateOne(data[0]);

                }
                //but we want to show one patient data in clicking his name, So as data coming as array we send the individual data to another state() as a object
            });
    }

    const editPatient = (index) => {
        updateOne(appointments[index]);
        pickName(appointments[index].name);
        pickMobile(appointments[index].mobile);
        pickEmail(appointments[index].email);
        updatepid(appointments[index].pid);
        updatepfee(appointments[index].fee);
    }



    useEffect(() => {
        getDocBookings();
    }, [1]);

    // const[aid,pickAid]=useState("");
    const [name, pickName] = useState("");
    const [email, pickEmail] = useState("");
    const [mobile, pickMobile] = useState("");
    const [attainded, pickAttainded] = useState("");
    const [diagnosis, pickDiagnosis] = useState("");
    const [medicine, pickMedicine] = useState("");
    const [details, pickdetails] = useState("");
    const [symptons, picksymptons] = useState("");
    const [message, updateMessage] = useState("");
    const [pid, updatepid] = useState("");
    const [pfee, updatepfee] = useState("");

    const update = () => {
        let input = {
            "appointmentid": userone.aid,
            "name": name,
            "email": email,
            "mobile": mobile,
            "flag": attainded,
            "diagnosis": diagnosis,
            "medicine": medicine,
            "details": details,
            "symptoms": symptons,
            "pid": pid,
            "fee": pfee,
            "doctorid": localStorage.getItem("id"),
            "hospitalid":localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/doctor/savepatient', requestOptions)
            .then(response => response.text())
            .then(data => {
                updateMessage(data);
            });
    }

    return (
        <div className="container-fluid">
            <div className="row">

                {/* <h4 className="text-center text-primary">Dr. {localStorage.getItem("name")} Appointments : {appointments.length}</h4> */}
                <div className="col-lg-3  bgcolor2 scroll text-white  p-3 px-5">
                    <h4 className="text-warning fontweight mt-4">Patient Name</h4>
                    <hr className="m-0 p-0" />
                    <div className="patient">
                        {
                            appointments.map((pdata, index) => {
                                return (
                                    <div className="overflow-auto  ">
                                        <div className=" my-4 " key={index}>

                                            <a onClick={editPatient.bind(this, index)}> <h5>{pdata.name}</h5> </a>
                                        </div> <hr className="m-0 p-0" /></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-9 bgcolor  p-3   text-white">

                    <div className="row">
                        <div className="col-lg-1 mt-4"></div>

                        <div className="col-lg-4">
                            {/* <div className="row mt-4">
                                <div className="col-lg-9">
                                    <DatePicker
                                        className="form-control"
                                        selected={bookingdate}
                                        onChange={date => updateBookingdate(date)}
                                        dateFormat='yyyy-MM-dd'
                                    />
                                    <input type="text" className="form-control" value={bookingdate}  onChange={date => updateBookingdate(date.target.value)}/>

                                </div>
                                <div className="col-lg-3 m-0 p-0">
                                    <button className="btn btn-primary  btn-sm" onClick={getDocBookings} >Search</button>
                                </div>

                            </div> */}
                            <h4 className="text-warning  fontweight mt-4">Appointment Details</h4><hr />

                        </div>
                        <div className="col-lg-5 mt-4">
                            <p className="text-warning fontweight text-center">{message}</p>
                        </div>
                        <div className="col-lg-2 mt-4">
                        <button className="btn btn-primary  btn-sm" >History</button>
                        </div>
                    </div>

                    <div className="row mt-3 scrollp">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-5 ">
                            {/* <div>
                                <label>Appointment ID</label>
                                <input type="text" className="form-control"  value={userone.aid} readOnly />
                            </div> */}

                            <div className="mt-2">
                                <label>Name</label>
                                <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} value={name} />
                            </div>
                            <div className="mt-2">
                                <label>Attended</label>
                                <select className="form-select" onChange={obj => pickAttainded(obj.target.value)} value={attainded}>
                                    <option>YES</option>
                                    <option>NO</option>
                                </select>
                            </div>

                            <div className="mt-2">
                                <label>Details</label>
                                <textarea className="form-control" value={details} onChange={obj => pickdetails(obj.target.value)}></textarea>
                            </div>
                            <div className="mt-2">
                                <label>Symptoms</label>
                                <textarea className="form-control" value={symptons} onChange={obj => picksymptons(obj.target.value)}></textarea>
                            </div>


                        </div>

                        <div className="col-lg-5 ">
                            <div className="mt-2">
                                <label>Mobile</label>
                                <input type="text" className="form-control" onChange={obj => pickMobile(obj.target.value)} value={mobile} />
                            </div>
                            <div className="mt-2">
                                <label>Email</label>
                                <input type="text" className="form-control" onChange={obj => pickEmail(obj.target.value)} value={email} />
                            </div>
                            {/* <div className="mt-2">
                                <label>Mode</label>
                                <input type="text" className="form-control"  value={userone.mode} />
                            </div> */}
                            {/* <div className="mt-2">
                                <label>City</label>
                                <input type="text" className="form-control" value={userone.city} />
                            </div> */}
                            <div className="mt-2">
                                <label>Diagnosis</label>
                                <textarea className="form-control" value={diagnosis} onChange={obj => pickDiagnosis(obj.target.value)}></textarea>
                            </div>
                            <div className="mt-2">
                                <label>Medicines</label>
                                <textarea className="form-control" value={medicine} onChange={obj => pickMedicine(obj.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                    <div className="mt-4 text-center">
                        <button className="btn btn-primary rounded" onClick={update}>Update</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default DocBookings;