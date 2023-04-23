import React, {useState, useEffect } from 'react'

function Doctor() {
    const[doctor,updateDoctor]=useState([]);
    const[message,updateMessage]=useState('');


    const getDoctors = () =>{
        let input={ "hospitalid":localStorage.getItem("hospitalid"),"id": localStorage.getItem("id")};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Hospital/doctorforhospital', requestOptions)
        .then(response => response.json())
        .then(data =>{
            if(data.length>0){
                updateDoctor(data); 
                console.log(data); 
            }           
        });
    }

    useEffect(()=>{
        getDoctors()
    },[1])



    return (
        <div className="container">
            <div className="row mt-3">
                <h2 className='text-center text-primary mb-4'>1. Doctor List</h2>
                <p className='text-center text-success'>{message}</p>
                <div className="col-lg-12">
                    {
                        doctor.map((info,index)=>{
                            return(
                                <div className="row px-5 py-3" key={index }>
                                <div className="col-lg-3">
                                    <p className='mb-4'>{info.name}  - Rs. ({info.amount})</p>
                                    <p className='mb-4'>{info.education}</p>
                                    <p className='mb-4'>{info.speciality}</p>
                                    <p className='mb-4'>Exp: {info.experience} Years </p>
                                    <p className='mb-4'>{info.mobile}</p>
                                    <p className='mb-4'>{info.email}</p>
                                </div>
                                <div className="col-lg-3">
                                    <p className='mb-4'>{info.areaname}</p>
                                    <p className='mb-4'>{info.address}</p>
                                    <p className='mb-4'>{info.city}</p>
                                    <p className='mb-4'>{info.state} </p>
                                    <p className='mb-4'>{info.pincode}</p>
                                </div>
                                <div className="col-lg-6">
                                    <p className='mb-4'>{info.active}</p>
                                    <p className='mb-4'>
                                        {info.profile}
                                    </p>
        
                                </div><hr className='text-secondary' />
                            </div> 
                            )
                        })
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Doctor