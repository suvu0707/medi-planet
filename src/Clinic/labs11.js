import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const HospitalLabs = () =>{
    const labtestperpatient = [];
    const labnames = [];
    const pdetails = {};   
    const [pselectedtest, setSelectedTest] = useState("");
    const [labTest, setLabTest] = useState([]);
    const [allPDetails, updateAllPDetails] = useState([]);

    const [labname, setLabname] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [procedure, setProcedure] = useState("");
    
    const [pid, setPID] = useState("");

    const getAllLabTest = () => {
        fetch("http://localhost:3456/lablist")
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setLabTest(data);
        })
    }

    const getAllPatientDetails = () =>{
        var input = {
            "id": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/patientforhospital", requestOptions)
        .then(response => response.json())
        .then(data=>{
            // console.log(data);
            updateAllPDetails(data);
        })
    }

    const saveLabTest = () =>{
        var input = {
            "labname" : labname,
            "price" : price,
            "duration" : duration,
            "procedure" : procedure
        };
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(input)
        };
        fetch("http://localhost:3456/lablist", requestOptions)
        .then(response => response.text())
        .then(data =>{
            setLabname(""); setPrice(""); setDuration(""); setProcedure("");
            getAllLabTest();
            toast.success(labname + " saved successfully");            
        })
    }

    const deleteLabTest = (lid) =>{
        var url = "http://localhost:3456/lablist/" + lid;
        fetch(url, {method: "DELETE"})
        .then(response => {
            toast.success("Deleted Successfully");
            getAllLabTest();
        })
    }

    const addLabTest = (id) =>{  
        labTest.map((ldata)=>{
            if(ldata.id == id){
                labtestperpatient.push(ldata);
            }
        })  
        
    }

    const savePLab = () =>{
        allPDetails.map((pdata, index)=>{
            if(pdata.pid == pid){
                pdetails.pid = pdata.pid;
                pdetails.name = pdata.name;                
                pdetails.mobile = pdata.mobile;
                pdetails.email = pdata.email;
                pdetails.doctorname = pdata.doctorname;                
            }
        })
        var input = {
            "patientdetails" : pdetails,
            "labdetails" : labtestperpatient
        };       
        const requestOptions = {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(input)
        };
        fetch("http://localhost:3456/bookings", requestOptions)
        .then(response => response.json())
        .then(data =>{
           toast.success("Data saved successfully");
           console.log(data)
        })
    }

    useEffect(()=>{
        getAllLabTest();
        getAllPatientDetails();
    }, [1])

    return(       
        <div className="container-fluid">
            <div className="row mt-4 text-center text-primary">
                <div className="col-lg-6 offset-3">
                    <h4>Enter Lab Test Details</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-3">
                    <div className="mt-2">
                        <label>Test Name</label>
                        <input type="text" className="form-control" onChange={obj=>setLabname(obj.target.value)} value={labname} />
                    </div>
                    <div className="mt-2">
                        <label>Report Duration</label>
                        <input type="text" className="form-control" onChange={obj=>setDuration(obj.target.value)} value={duration} />
                    </div>
                    <div className="text-center mt-2">
                        <button className="btn btn-primary" onClick={saveLabTest}>Save</button>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="mt-2">
                        <label>Price</label>
                        <input type="number" className="form-control" onChange={obj=>setPrice(obj.target.value)} value={price} />
                    </div>
                    <div className="mt-2">
                        <label>Procedure</label>
                        <textarea className="form-control" rows="3" onChange={obj=>setProcedure(obj.target.value)} value={procedure}></textarea>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
            <hr />
            <div className="row">               
                <div className="col-lg-2 text-end d-flex align-center justify-content-center">
                    <h6>Patient Name : </h6>
                </div>
                <div className="col-lg-3 text-start">
                    <select className="form-select" onChange={obj=>setPID(obj.target.value)}>
                        <option value="">Choose</option>
                        {
                            allPDetails.map((pdata, index)=>{
                                return(
                                    <option key={index} value={pdata.pid}>{pdata.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-lg-7">
                    <button className="btn btn-warning" onClick={savePLab} >Save Lab Test Details</button>
                    <span>{pselectedtest}</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">                    
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>LabTest Name</th>
                                <th>Price</th>
                                <th>Report Duration</th>
                                <th>Procedure</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                labTest.map((ldata, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{ldata.id}</td>
                                            <td>{ldata.labname}</td>
                                            <td>{ldata.price}</td>
                                            <td>{ldata.duration}</td>
                                            <td>{ldata.procedure}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={deleteLabTest.bind(this,ldata.id)}><i className="fa fa-trash"></i> Delete</button> &nbsp;
                                                <button className="btn btn-warning" onClick={addLabTest.bind(this, ldata.id)}><i className="fa fa-plus"></i>Add</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
        </div>
    );
}

export default HospitalLabs;