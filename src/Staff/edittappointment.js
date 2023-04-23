import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Edittappointment() {
   const {pid} = useParams();
    const [pname, updatepName] = useState("");
    const [pmobile, updatepMobile] = useState("")
    const [pemail, updatepEmail] = useState("");
    const [paddress, updatepAddress] = useState("");
    const [plastpaid, updatepLastpaid] = useState("");
    const [plastvisit, updatepLastvisit] = useState("");
    const [pslot, updatepSlot] = useState("");
    const [pdiagnosis, updatepDiagnosis] = useState("");
    const [psymptoms, updatepSymptoms] = useState("");
    const [pmedicine, updatepMedicine] = useState("");
    const [pdetails, updatepDetails] = useState("");
    const [pfee, updatepFee] = useState("");
    const [pdoctor, updatepDoctor] = useState("");
    const [message, updateMessage] = useState("");
    const [pdocid, updatepDocID] = useState("");
    const [prevision, pickpRevision] = useState("");

    const [alldoc, updateAllDoc] = useState([]);

    const getPatientDetails = () =>{
        let input = { "pid": pid };
        const requestOptions = {
            method: 'POST',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Doctor/patientdetails", requestOptions)
        .then(response => response.json())
        .then(data =>{           
                // console.log(data);
                updatepName(data.name);
                updatepMobile(data.mobile);
                updatepEmail(data.email);
                updatepAddress(data.address);
                updatepLastpaid(data.lastpaid);
                updatepLastvisit(data.lastvisit);
                updatepSlot(data.slot);
                updatepDiagnosis(data.diagnosis);
                updatepSymptoms(data.symptoms);
                updatepMedicine(data.medicine);
                updatepDetails(data.details);   
                updatepFee(data.fee);
                updatepDoctor(data.doctorname);
                updatepDocID(data.doctorid);
        })
    }

    const updatePatient =() =>{
        const regEx = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
        if (pname == "" || pemail == "" || pmobile == "" || paddress == "") {
            updateMessage("Please fill all input-field")
        } else if (!regEx.test(pemail) && pemail !== "") {
            updateMessage("Email is Not Valid");
        }
        //   else if(password.length<3 || password.length>16){
        //     updateMessage("Password should have more than 2 or less than 16 charecters");}
        else if (pmobile.length < 10 || pmobile.length > 10) {
            updateMessage("Mobile Number Should have 10 digits");
        } else {
        let input = {
            "name": pname,
            "mobile": pmobile,
            "email": pemail,
            "address": paddress,
            "doctorname": pdoctor,
            "fee": pfee,
            "pid": pid,
            "doctorid": pdocid,
            "type": prevision,
            "hospitalid": localStorage.getItem("hospitalid"),

        };
        const requestOptions = {
            method: 'POST',
            header: {'Content-Type' : 'application/json'},
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Doctor/savepatientbystaff", requestOptions)
        .then(response => response.text())
        .then(data =>{
            updateMessage(data);
        })
    }
}

    const getAllDoctors = () =>{
        let input = {
            "id": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid"),
            "type":localStorage.getItem("type"),

        };
        const requestOptions = {
            method: 'POST',
            header : {'Content-Type' : 'application/json'},
            body : JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/doctorforhospital", requestOptions)
        .then(response => response.json())
        .then(data =>{              
                // console.log(data);
                updateAllDoc(data);            
        })
    }

    const getAmount = (did) =>{
        alldoc.map((ddata, index) =>{
            if(did === ddata.doctorid){
                updatepFee(ddata.amount);
                updatepDocID(ddata.doctorid);
                updatepDoctor(ddata.name)
            }
        })

    }

    useEffect(()=>{
        getPatientDetails();
        getAllDoctors();
    },[1]);
    return(
        <div className="container">
            <div className="row mt-4">
                <h1 className="text-info text-center">Patient Details</h1>
                <p className="text-danger text-center">{message}</p>
                <div className="col-lg-4">
                    <div className="mt-1">
                        <label>Name</label>
                        <input type="text" className="form-control" onChange={obj=>updatepName(obj.target.value)} value={pname} />
                    </div>
                    <div className="mt-2">
                        <label>Mobile</label>
                        <input type="text" className="form-control" onChange={obj=>updatepMobile(obj.target.value)} value={pmobile} />
                    </div>
                    <div className="mt-2">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={obj=>updatepEmail(obj.target.value)} value={pemail} />
                    </div>
                    <div className="mt-2">
                        <label>Address</label>
                        <textarea className="form-control" rows="3" onChange={obj=>updatepAddress(obj.target.value)} value={paddress}></textarea>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mt-1">
                        <label>Doctor</label>                        
                        <select className="form-select" onChange={obj=>getAmount(obj.target.value)}>
                            <option value={pdocid}>Chooes</option>
                            {
                                alldoc.map((ddata, index)=>{
                                    return(
                                        <option key={index} value={ddata.doctorid}>{ddata.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mt-2">
                        <label>Fees</label>
                        <input type="text" className="form-control" value={pfee} />
                    </div>
                    <div className="mt-4 ">
                        <label>Revision</label> &nbsp;  &nbsp;
                        <div className="form-check form-check-inline" onChange={obj=>pickpRevision(obj.target.value)}>
                            <input type="radio" className="form-check-input" name="revision" /> 
                            <label class="form-check-label">New</label>                              
                        </div>
                        <div className="form-check form-check-inline" onChange={obj=>pickpRevision(obj.target.value)}>
                            <input type="radio" className="form-check-input" name="revision" /> 
                            <label class="form-check-label">Follow Up</label>                              
                        </div>
                    </div>
                    <div className="mt-2">
                        <label>Last Paid Amount</label>
                        <input type="text" className="form-control" value={plastpaid} />
                    </div>
                    <div className="mt-2">
                        <label>Last Visited On</label>
                        <input type="text" className="form-control" value={plastvisit} readOnly/>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mt-1">
                        <label><b>Slot</b></label>
                        <p>{pslot}</p>
                    </div>
                    <div className="mt-2">
                        <label><b>Diagnosis</b></label>
                        <p>{pdiagnosis}</p>
                    </div>
                    <div className="mt-2">
                        <label><b>Symptoms</b></label>
                        <p>{psymptoms}</p>
                    </div>
                    <div className="mt-2">
                        <label><b>Medicines</b></label>
                        <p>{pmedicine}</p>
                    </div>
                    <div className="mt-2">
                        <label><b>Details</b></label>
                        <p>{pdetails}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4 offset-4">
                    <div>
                        <button className="btn btn-primary text-white rounded" onClick={updatePatient}> Pay Now </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edittappointment;