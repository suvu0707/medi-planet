import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


function Newpatient() {
    const [pname, pickPname] = useState("");
    const [email, pickEmail] = useState("");
    const [mobile, pickMobile] = useState("");
    const [docid, pickDocid] = useState("");
    const [dname, updateDname] = useState("");
    const [fee, pickFee] = useState("");
    const [address, pickAddress] = useState("");
    const [message, updateMessage] = useState("")

    const [did, updateDid] = useState([]);
    const getAllDoctors = () => {
        let input = {
            "id": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid"),
        };
        const requestOptions = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/doctorforhospital", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                updateDid(data);
            })
    }

    useEffect(() => {
        getAllDoctors()
    }, [1])

    const getAmount = (doid) => {
        did.map((ddata, index) => {
            if (doid === ddata.doctorid) {
                pickFee(ddata.amount);
                pickDocid(ddata.doctorid);
                updateDname(ddata.name)
            }
        })

    }

    
    


    const save = () => {
        const regEx = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
        if (pname == "" || email == "" || mobile == "" || address == "" || docid=="" || fee=="") {
            updateMessage("Please fill all input-field")
        } else if (!regEx.test(email) && email !== "") {
            updateMessage("Email is Not Valid");
        }
        //   else if(password.length<3 || password.length>16){
        //     updateMessage("Password should have more than 2 or less than 16 charecters");}
        else if (mobile.length < 10 || mobile.length > 10) {
            updateMessage("Mobile Number Should have 10 digits");
        } else {
            var input = {
                "name": pname,
                "email": email,
                "mobile": mobile,
                "doctorid": docid,
                "fee": fee,
                "address": address,
                "hospitalid": localStorage.getItem("hospitalid")
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };

            fetch('https://www.medicalplanet.in/webapi/Doctor/newpateint', requestOptions)
                .then(response => response.text())
                .then(data => {
                    updateMessage(data);
                    console.log(data);
                });
        }
    }



    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-lg-8 bg-warning p-4 rounded mt-4 offset-2">
                    <h3 className='text-center text-primary'>Add New Patients</h3><hr className='text-primary' />
                    <p className="text-center text-succe">{message}</p>

                    <div className="row  mt-4">
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Patient Name</label>
                                <input type="text" className='form-control' value={pname} onChange={obj => pickPname(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <textarea className='form-control' value={address} onChange={obj => pickAddress(obj.target.value)}></textarea>
                            </div>


                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Email Id</label>
                                <input type="email" className='form-control' value={email} onChange={obj => pickEmail(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Doctor Name</label>
                                <select className="form-select" onChange={obj => getAmount(obj.target.value)}>
                                    <option value={docid}>Chooes</option>
                                    {
                                        did.map((ddata, index) => {
                                            return (
                                                <option key={index} value={ddata.doctorid}>{ddata.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>


                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Mobile No</label>
                                <input type="text" className='form-control' value={mobile} onChange={obj => pickMobile(obj.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Doctor Fee</label>
                                <input type="number" className='form-control' value={fee} />
                            </div>

                        </div>
                    </div>
                    <div className="m-3 text-center">
                        <button className='btn btn-primary ' onClick={save}>Save Patient</button>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Newpatient