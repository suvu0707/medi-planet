import React,{ useEffect,useState } from 'react'
import {Link} from 'react-router-dom'



function Apppointment() {
    const[tappoint,updateTappoint]=useState([]);
    const[search,updateSearch]=useState([]);
    // const[bookingdate,updateBookingdate]=useState("");

    const getTodayappointments=()=>{
        let input = {
            "id": localStorage.getItem("id"),
            "hospitalid":localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/getpatients', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.length>0){
                  updateTappoint(data);
                }
            });
    }

    useEffect(()=>{
        getTodayappointments();

    },[1]);

  return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-lg-4">
                <h3 className='text-info '>Todays Apppointment : {tappoint.length}</h3>
            </div>
            <div className="col-lg-5"></div>
            <div className="col-lg-3">
               <input type="text" className='form-control' placeholder='Search patients by name/mobile/email'  onChange={obj=>updateSearch(obj.target.value)}/>
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
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Last Visit</th>
                            <th>Fee Paid</th>                           
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tappoint.filter((info)=>
                            info.name.toLowerCase().includes(search) ||
                            info.name.toUpperCase().includes(search) ||
                            info.email.toUpperCase().includes(search) ||
                            info.email.toLowerCase().includes(search) ||
                            info.mobile.includes(search)
                        ).map((info,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{info.pid}</td>
                                        <td>{info.name}</td>
                                        <td>{info.doctorname}</td>
                                        <td>{info.fee}</td>
                                        <td>{info.mobile}</td>
                                        <td>{info.email}</td>
                                        <td>{info.lastvisit}</td>
                                        <td>{info.feepaid}</td>
                                        <td>
                                            <Link className="btn btn-primary btn-sm" to={`/etappoint/${info.pid}`}><i className='fa fa-credit-card'></i></Link>
                                            <Link className="btn btn-dark btn-sm mx-2" to='/print'><i className='fa fa-print'></i></Link>
                                            
                                                                                    
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

export default Apppointment;