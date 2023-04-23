import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Lab() {

    const [lablist, updateLablist] = useState([]);
    const [tname, pickTname] = useState('');
    const [price, pickPrice] = useState('');
    const [duration, pickDuration] = useState('');
    const [procedure, pickProcedure] = useState('');
    const [message, updataMessage] = useState('');
    const [pdetails, pickPdetails] = useState('');
    const [allpatient, updateAllpatient] = useState([])


    const getLablist = () => {
        fetch("http://localhost:7894/Lablist")
            .then(response => response.json())
            .then(arrayList => {
                updateLablist(arrayList);
            })
    }
    useEffect(() => {
        getLablist();
    }, [1]);

    const save = () => {

        const url = "http://localhost:7894/Lablist";
        const newdata = {
            "name": tname,
            "price": price,
            "procedure": procedure,
            "duration": duration,
        }

        axios.post(url, newdata)
            .then(response => {
                updataMessage(tname + " Added Successfully")
            })
    }

    


    const getAllpatientdetails = () => {

        let input = {
            "doctorid": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id"),
            "type": localStorage.getItem("type"),
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/patientforhospital", requestOptions)
            .then(response => response.json())
            .then(data => {
                updateAllpatient(data);
            })
    }

    useEffect(() => {
        getAllpatientdetails();
    }, [1]);


    const add=(lid,lname,lprice,lduration,lprocedure,pid,pname)=>{
        var input = {
            "patientdetails":{"patientid":pid,"patientname":pname},
            "labtestdetails":[{
                "labtestname" : lname,
                "labtestprice" : lprice,
                "labtestduration" : lduration,
                "labtestprocedure" : lprocedure
    
            }]
        };
        const requestOptions = {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(input)
        };
        fetch("http://localhost:7894/Bookings", requestOptions)
        .then(response => response.text())
        .then(data =>{
                updataMessage(data);
                console.log(data);
        })
    }
           
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-lg-12">
                    <h3 className="text-center text-info">Labs</h3>
                    <p className="text-center text-danger">{message}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-2 mb-3"></div>
                <div className="col-lg-1 d-flex align-items-center mb-3">Test Name :</div>
                <div className="col-lg-3 align-middle mb-3"><input type="text" className='form-control' value={tname} onChange={obj => pickTname(obj.target.value)} /></div>
                <div className="col-lg-1 d-flex align-items-center mb-3">Price :</div>
                <div className="col-lg-3 align-middle mb-3"><input type="text" className='form-control' value={price} onChange={obj => pickPrice(obj.target.value)} /></div>
                <div className="col-lg-2 mb-3"></div>

                <div className="col-lg-2"></div>
                <div className="col-lg-1 d-flex align-items-center">Test Name :</div>
                <div className="col-lg-3 align-middle"><textarea className='form-control' value={procedure} onChange={obj => pickProcedure(obj.target.value)}></textarea></div>
                <div className="col-lg-1  align-items-center">Test Name :</div>
                <div className="col-lg-3 align-middle"><input type="text" className='form-control' value={duration} onChange={obj => pickDuration(obj.target.value)} /></div>
                <div className="col-lg-2"></div>
                <div className="col-lg-12 text-center mt-4">
                    <button className=" btn btn-primary" onClick={save}>Save</button>


                </div>
            </div>

            <div className="row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-2 mb-4"><h4>Patient Name :</h4></div>
                <div className="col-lg-4 mb-4">
                    <select className='form-select' onChange={obj=>pickPdetails(obj.target.value)}>
                        <option value="">Chooes</option>
                        {
                            allpatient.map((info, index) => {
                                return (
                                    <option key={index} value={info.pid}>{info.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-12">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Test Id</th>
                                <th>Test Name</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Procedure</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lablist.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.id}</td>
                                            <td>{info.name}</td>
                                            <td>{info.price}</td>
                                            <td>{info.duration}</td>
                                            <td>{info.procedure}</td>
                                            <td>
                                                <button className='btn btn-danger'><i className='fa fa-trash'></i></button>
                                                <button className='btn btn-primary mx-2' onClick={add.bind(this,info.id,info.name,info.price,info.duration,info.procedure,info.pid,info.name)}><i className='fa fa-plus '></i></button>
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

export default Lab