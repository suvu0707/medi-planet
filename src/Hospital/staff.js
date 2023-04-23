import React, { useEffect, useState } from 'react'

function Staff() {

    const[staff,updateStaff]=useState([]);
    const[pname,updatepName]=useState("");
    const[pemail,updatepEmail]=useState("");
    const[pmobile,updatepMobile]=useState("");
    const[paddress,updatepAddress]=useState("");
    const[type,updateType]=useState("");
    const[password,updatePassword]=useState("");
    const[profile,updateProfile]=useState("");
    const[message,updateMessage]=useState("");

    const StyleR = {color : "red"}
    const StyleG={color : "green"}
    const[color,updateColor]=useState(StyleR)

    const getAllStaff = () =>{
        let input = {
            "hospitalid": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method: 'POST',  //used to send data from frontend to backend in secured manner
            header : {'Content-Type' : 'application/json'},  // define type of content 
            body : JSON.stringify(input)   // Convert a array object to json srting
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/stafflist", requestOptions)
        .then(response => response.json())
        .then(data =>{              
                if(data.length>0){
                    updateStaff(data); 
                    console.log(data); 
                }
        })
    }

    useEffect(()=>{
        getAllStaff()
    },[1])


    const saveStaff = () =>{
        const regEx = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
      if(pname=="" || pemail=="" || pmobile=="" || paddress=="" ){                             
        updateMessage("Please fill all input-field")
      }else if  (!regEx.test(pemail) && pemail !== "") {
        updateMessage("Email is Not Valid");
      } 
    //   else if(password.length<3 || password.length>16){
    //     updateMessage("Password should have more than 2 or less than 16 charecters");}
      else if(pmobile.length<10 || pmobile.length>10){
        updateMessage("Mobile Number Should have 10 digits");
      }else {
        updateMessage("Please Wait Processing...");
        let input = {
            "name": pname,
            "email": pemail,
            "mobile": pmobile,
            "address": paddress,
            "type": type,
            "profile": profile,
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id"),
        };
        const requestOptions = {
            method : 'POST',
            header : {'Content-Type' : 'application/json' },
            body : JSON.stringify(input) 
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/savestaff", requestOptions)
        .then(response => response.text())
        .then(data =>{
            updateMessage(data);
            updatepName(""); 
            updatepMobile("");   
            updatepEmail("");    
            updatepAddress("");
            updateType("");    
            updateProfile("");    
            getAllStaff();
            updateColor(StyleG)
        })
      }
    }

    const clearAll=()=>{
        updatepName(""); 
        updatepMobile("");   
        updatepEmail("");    
        updatepAddress("");
        updateType("");    
        updateProfile("");
    }


    const deleteStaff = (staffid,typee,emaill) => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id"),
            "staffid":staffid,
            "email":emaill,
            "type":typee,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Hospital/deletestaff", requestOptions)
            .then(response => response.text())
            .then(data => {
                updateMessage(data);
                updateStaff([]); 
                getAllStaff();

                
            })
    }


 

  return (
    <div className="container">
        <div className="row mt-3">
            <div className="col-lg-12">
                <h2 className='text-center text-primary mb-4'>Staff Management</h2>
                <p className='text-center  mb-4' style={color}>{message}</p> 
            </div>
            <div className="col-lg-2">
                <label>Name</label>
                <input type="text" className='form-control' value={pname} onChange={obj=>updatepName(obj.target.value)} />
            </div>
            <div className="col-lg-2">
                <label>Email</label>
                <input type="text" className='form-control' value={pemail} onChange={obj=>updatepEmail(obj.target.value)} />
            </div>
            <div className="col-lg-2">
                <label>Mobile</label>
                <input type="number" className='form-control' value={pmobile} onChange={obj=>updatepMobile(obj.target.value)} />
            </div>
            {/* <div className="col-lg-2">
                <label>Password</label>
                <input type="password" className='form-control' value={password} onChange={obj=>updatePassword(obj.target.value)} />
            </div> */}
            <div className="col-lg-2">
                <label>Type</label>
                <select className='form-select' value={type} onChange={obj=>updateType(obj.target.value)} >
                    <option value="">Chooes</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="STAFF">Billing Staff</option>
                    <option value="PHARMA">Pharma Staff</option>
                    <option value="LAB">Lab Medical Staff</option>
                </select>
            </div>
            <div className="col-lg-2">
                <label>Profile</label>
                <input type="text" className='form-control' value={paddress} onChange={obj=>updatepAddress(obj.target.value)} />
            </div>
            <div className="col-lg-2 d-flex align-items-center mt-4">
                <label htmlFor=""></label>
                <button className='btn btn-primary  mb-0 bstn-sm mx-2 ' onClick={saveStaff}>Save</button>
                <button className='btn btn-warning mb-0 btan-sm' onClick={clearAll}>Clear</button>
            </div>
            <div className="col-lg-12 mt-4">
            <h5 className='text-center text-dark mb-3'>About Staff : {staff.length}</h5>
             
                <table className="table table-bordered table-sm">
                
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            <th>Type</th>
                            <th>Profile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           staff.map((info,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{info.name}</td>
                                    <td>{info.mobile}</td>
                                    <td>{info.email}</td>
                                    <td>{info.type}</td>
                                    <td>{info.profile}</td>
                                    <td><button className='btn btn-danger' onClick={deleteStaff.bind(this,info.staffid,info.type,info.email)}><i className='fa fa-trash'></i></button></td>
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

export default Staff