import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Hoc from '../Hoc/hoc';


var input = {
    "doctorid": localStorage.getItem("id"),
    "hospitalid": localStorage.getItem("hospitalid"),
    "id": localStorage.getItem("id"),
    "type": localStorage.getItem("type"),
}
function Allpatients({list,offset,perpage,pagination}) {

    const [search, updateSearch] = useState([]);



    const savePatientData=(pid,pname)=>{
        localStorage.setItem("patientid",pid)
        localStorage.setItem("patientname",pname)

        const current = new Date();
        const date = current.getFullYear() + "-" + (current.getMonth() + (1)) + "-" + current.getDate();

        const time = current.getHours() + '-' + current.getMinutes() + '-' + current.getSeconds();
        const orderid = pid + "-" + date + "-" + time;
        localStorage.setItem("orderid", orderid)
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-9">
                            <h3 className=" text-info mb-4 text-start">All Patient Details</h3>
                        </div>
                        <div className="col-lg-3">
                            <input type="text" className='form-control' placeholder='Search patients by name/mobile' onChange={obj => updateSearch(obj.target.value)} />
                        </div>
                    </div>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Patient Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Doctor Name</th>
                                <th>Diagnosis</th>
                                <th>Medicine</th>
                                <th>Symptons</th>
                                <th>Last Visit</th>
                                <th>Fee</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.filter((info) =>
                                    info.name.toLowerCase().includes(search) ||
                                    info.name.toUpperCase().includes(search) ||
                                    info.mobile.includes(search)
                                ).slice(offset, offset + perpage).map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.pid}</td>
                                            <td><Link className='text-primary decoration' to={`/etappoint/${info.pid}`}>{info.name}</Link></td>
                                            <td>{info.email}</td>
                                            <td>{info.mobile}</td>
                                            <td>{info.doctorname}</td>
                                            <td>{info.diagnosis}</td>
                                            <td>{info.medicine}</td>
                                            <td>{info.symptoms}</td>
                                            <td>{info.lastvisit}</td>
                                            <td>{info.fee}</td>
                                            <td><Link className='btn btn-primary btn-sm' to='/pharma' onClick={savePatientData.bind(this,info.pid,info.name)}>Buy</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        pagination
                    }
                </div>
            </div>
        </div>
    )
}

export default Hoc(Allpatients,input,"Hospital/patientforhospital")


