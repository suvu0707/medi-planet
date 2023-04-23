import React, {useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom";

const EditDoctorProfile = () =>{
    // const [doctor, updateDoctor] = useState([]);
    const navigate=useNavigate()
    const [message, updateMessage] = useState("");
   const [dname, pickdName] = useState("");
   const [dedu, pickdEdu] = useState("");
   const [dspeciality, pickdSpeciality] = useState("");
   const [dexp, pickdExp] = useState("");
   const [dmobile, pickdMobile] = useState("");
   const [demail, pickdEmail] = useState("");
   const [dprofile, pickdProfile] = useState("");
   const [dcity, pickdCity] = useState("");
   const [damount, pickdAmount] = useState("");
   const [dactive, pickdActive] = useState("");
   const [daddress, pickdAddress] = useState("");
   const [dareaname, pickdAreaname] = useState("");
   const [dstate, pickdState] = useState("");
   const [dpincode, pickdPincode] = useState("");
   const [hospitalid, pickHospitalID] = useState("");
   const [hospitalList, updateHospitalList] = useState([]);

   const getDocProfile = () =>{
    let input={ "doctorid":localStorage.getItem("id"),"hospitalid":localStorage.getItem("hospitalid")};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };
    fetch('https://www.medicalplanet.in/webapi/Doctor/viewprofile', requestOptions)
    .then(response => response.json())
    .then(data =>{
        // console.log(data);
        pickdName(data.name);   pickdEdu(data.education);  pickdSpeciality(data.speciality);
         pickdExp(data.experience);    pickdActive(data.active);  pickdMobile(data.mobile);
         pickdEmail(data.email);    pickdProfile(data.profile);   pickdAmount(data.amount);
         pickdCity(data.city);   pickdAddress(data.address);   pickdAreaname(data.areaname);
         pickdState(data.state); pickdPincode(data.pincode);   
        //  pickdURL(data.url);
    });
}

   const updateDoc = () =>{
    let input={ 
		"doctorid":localStorage.getItem("id"),
		"name": dname,
    	"email": demail,
    	"mobile": dmobile,
    	"city": dcity,
    	"address": daddress,
    	"pincode": dpincode,
    	"state": dstate,
    	"active": dactive,
    	"speciality": dspeciality,
    	"experience": dexp,
    	"education": dedu,
    	"profile": dprofile,
    	"areaname": dareaname,
        "amount": damount,
        "hospitalid": localStorage.getItem("hospitalid")
    	// "url":durl
		 };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/updateprofile', requestOptions)
        .then(response => response.text())
        .then(data =>{
            updateMessage(data); 
            navigate('/dprofile')
        });
   }

   const getHospitalList = () => {
        let input={ "id":localStorage.getItem("id"),"hospitalid":localStorage.getItem("hospitalid")};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Hospital/getall', requestOptions)
        .then(response => response.json())
        .then(data =>{
            // console.log(data);
            updateHospitalList(data);
        });
   }

   useEffect(()=>{
    getDocProfile();
    getHospitalList();
},[1]);

    return(
        <div className="container">
      <div className="row mt-3">
          <h3 className="text-center">Edit Doctor Details</h3>
          <p className="text-center text-danger">{message}</p>
          <div className="col-lg-4 mt-1">
              <div className="mt-2">
                  <label>Doctor Name</label>
                  <input type="text" className="form-control" onChange={obj=>pickdName(obj.target.value)} value={dname}/>
              </div>
              <div className="mt-2">
                  <label>Education</label>
                  <input type="text" className="form-control" onChange={obj=>pickdEdu(obj.target.value)} value={dedu} />
              </div>
              <div className="mt-2">
                  <label>Speciality</label>
                  <input type="text" className="form-control" onChange={obj=>pickdSpeciality(obj.target.value)} value={dspeciality} />
              </div>
              <div className="mt-2">
                  <label>Experience</label>
                  <input type="text" className="form-control" onChange={obj=>pickdExp(obj.target.value)} value={dexp} />
              </div>
              <div className="mt-2">
                   <label>Active</label>
                   <select className="form-select" onChange={obj=>pickdActive(obj.target.value)} value={dactive}>                       
                       <option value="YES">YES</option>
                       <option value="NO">NO</option>
                   </select>
               </div>
               <div className="mt-2">
                 <label>Select Hospital</label>
                 <select className="form-select" onChange={obj=>pickHospitalID(obj.target.value)}>                    
                    {
                        hospitalList.map((hdata, index) =>{
                            return(
                                <option key={index} value={hdata.hospitalid}>{hdata.name}</option>
                            )
                        })
                    }
                 </select>
              </div> 
          </div>

          <div className="col-lg-4 mt-1">
               <div className="mt-2">
                  <label>Mobile</label>
                  <input type="number" className="form-control" onChange={obj=>pickdMobile(obj.target.value)} value={dmobile} />
              </div>
              <div className="mt-2">
                  <label>Email</label>
                  <input type="emial" className="form-control" onChange={obj=>pickdEmail(obj.target.value)} value={demail} />
              </div> 
              <div className="mt-2">
                  <label>Amount</label>
                  <input type="number" className="form-control" onChange={obj=>pickdAmount(obj.target.value)} value={damount} /> 
              </div>            
              <div className="mt-2">
                  <label>Profile</label>
                  <textarea className="form-control" rows="7" onChange={obj=>pickdProfile(obj.target.value)} value={dprofile} > </textarea> 
              </div>                
              {/* <div className="mt-4">
                  <label>Available</label> 
               </div>       */}
         </div>

          <div className="col-lg-4 mt-1">   
               <div className="mt-2">
                  <label>Address</label>
               <textarea className="form-control" rows="4" onChange={obj=>pickdAddress(obj.target.value)} value={daddress} ></textarea>
               </div> 
               <div className="mt-2">
                  <label>Area Name</label>
                  <input type="text" className="form-control" onChange={obj=>pickdAreaname(obj.target.value)} value={dareaname} />
              </div>             
               <div className="mt-2">
                  <label>City</label>
               <input type="text" className="form-control" onChange={obj=>pickdCity(obj.target.value)} value={dcity} />
              </div>              
              <div className="mt-2">
                  <label>State</label>
               <input type="text" className="form-control" onChange={obj=>pickdState(obj.target.value)} value={dstate} />
              </div>
              <div className="mt-2">
                 <label>Pincode</label>
               <input type="number" className="form-control" onChange={obj=>pickdPincode(obj.target.value)} value={dpincode} />
              </div>              
          </div>               
      </div>
      <div className="mt-3 text-center">
          <button className="btn btn-primary rounded shadow" onClick={updateDoc}> <i className="fa fa-save"></i> Update</button>
      </div>      
  </div>
    )
}

export default EditDoctorProfile;