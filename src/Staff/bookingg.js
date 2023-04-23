import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';


const DrBookings = () =>{
    const [appointments, updateAppointments] = useState([]);
    const [userone, updateOne] = useState({});
    const [Dtodate, updateDtodate] = useState("");

    // const [style, setStyle] = useState("");

    const [pname, updatepName] = useState("");
    const [pmobile, updatepMobile] = useState("");
    const [pemail, updatepEmail] = useState("");
    const [pdiagnosis, updatepDiagnosis] = useState("");
    const [pmedicine, updatepMedicine] = useState("");
    const [pdetails, updatepDetails] = useState("");
    const [psymptoms, updatepSymptons] = useState("");
    const [pattended, updatepAttended] = useState("");
    const [message, updateMessage] = useState("");
    const [pid, updatepid] = useState("");
    const [pfee, updatepfee] = useState("");


    const editPatient = (index) =>{        
        updateOne(appointments[index]);
        updatepName(appointments[index].name);
        updatepMobile(appointments[index].mobile);
        updatepEmail(appointments[index].email);
        updatepid(appointments[index].pid);
        updatepfee(appointments[index].fee);
    }

    const getBookingDetails = () =>{
        let input = { "doctorid": localStorage.getItem("id") , "bookingdate":Dtodate };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/getbooking', requestOptions)
            .then(response => response.json())
            .then(data => {                
                if(data.length>0){   
                    // console.log(data)                           ;
                    updateAppointments(data);                  
                    updateOne(data[0]);  
                    updatepid(data[0].pid);
                    updatepName(data[0].name);
                    updatepMobile(data[0].mobile);
                    updatepEmail(data[0].email);
                    updatepfee(data[0].fee);
                }               
            });
    }

    const savePDetails = () =>{
        let input = {
            "appointmentid": userone.aid,
            "name": pname,
            "mobile": pmobile,
            "email": pemail,
            "diagnosis": pdiagnosis,
            "medicine": pmedicine, 
            "details": pdetails,
            "symptoms": psymptoms,
            "pid": pid,
            "fee": pfee,
            "doctorid": localStorage.getItem("id")
        };
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        }
        fetch("https://www.medicalplanet.in/webapi/doctor/savepatient", requestOptions)
        .then(response => response.text())
        .then(data =>{
            // console.log(data);
            updateMessage(data);
            // window.location.reload();
        })
    }

    useEffect(()=>{
        getBookingDetails(); 
    },[1]);

    return(       
        <div className="container-fluid">
            <div className=" row mt-2">                
                <h4 className="mt-2 text-center text-primary"> {userone.name} </h4>
                <p className="text-center text-danger">{message}</p>
                <div className="col-lg-3">
                        <h4 className="text-center text-info">Appointments : {appointments.length}</h4>                                            
                        <div className="p-2 scroll">                                                                              
                                {
                                    appointments.map((pdata, index)=>{
                                        //  <div className="hover">  
                                        return(                                                 
                                            <div key={index} onClick={editPatient.bind(this, index)} className="text-center border rounded m-1 p-2 hover" >   
                                                                                 
                                                <p>{index + 1}  : {pdata.name} </p>
                                                <p> {pdata.phone} </p>  
                                                <p>Time: {pdata.slot}</p>                                          
                                            </div>
                                                                                     
                                        )     
                                        // </div>                                     
                                    })                                   
                                }                                                           
                        </div>                
                </div>
                <div className="col-lg-9">
                                <div className="row mt-3">
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-3">
                                            <DatePicker
                                                className="form-control"
                                                placeholder="Date Picker"
                                                selected={Dtodate}
                                                onChange={date => updateDtodate(date)}
                                                dateFormat='yyyy-MM-dd'
                                            />
                                    </div>
                                    <div className="col-lg-2 text-start">
                                        <button className="btn btn-primary btn-sm" onClick={getBookingDetails}> Search </button>
                                    </div>
                                    <div className="col-lg-6"></div>
                                </div>
                   <div className=" row mt-3">                                  
                        <div className="col-lg-1"></div>                     
                            <div className="col-lg-5 ">                                
                                <div>
                                    <label>Name</label>
                                    <input type="text" className="form-control" onChange={obj=>updatepName(obj.target.value)} value={pname} />
                                </div>   
                                <div className="mt-2">
                                    <label>Email</label>
                                    <input type="text" className="form-control" onChange={obj=>updatepEmail(obj.target.value)} value={pemail} />
                                </div>                                                         
                            </div>
                            <div className="col-lg-5 ">
                                <div>
                                    <label>Mobile</label>
                                    <input type="text" className="form-control" onChange={obj=>updatepMobile(obj.target.value)} value={pmobile} />
                                </div>                                                                                                  
                                <div className="mt-2">
                                    <label>Attended</label>
                                    <select className="form-select" value={pattended} onChange={obj=>updatepAttended(obj.target.value)}>                            
                                        <option>NO</option>
                                        <option>YES</option>
                                    </select>
                                </div>                                                                
                            </div>   
                        <div className="col-lg-1"></div>                                          
                   </div>
                   <div className="row">
                       <div className="col-lg-1"></div>
                       <div className="col-lg-5">
                            <div className="mt-2">
                                <label>Details</label>
                                <textarea className="form-control" onChange={obj=>updatepDetails(obj.target.value)} value={pdetails}></textarea>
                            </div>  
                            <div className="mt-2">
                                <label>Diagnosis</label>
                                <textarea className="form-control" onChange={obj=>updatepDiagnosis(obj.target.value)} value={pdiagnosis}></textarea>
                            </div>
                       </div>
                       <div className="col-lg-5">
                            <div className="mt-2">
                                <label>Symptoms</label>
                                <textarea className="form-control" onChange={obj=>updatepSymptons(obj.target.value)} value={psymptoms}></textarea>
                            </div> 
                            <div className="mt-2">
                                <label>Medicines</label>
                                <textarea className="form-control" onChange={obj=>updatepMedicine(obj.target.value)} value={pmedicine}></textarea>
                            </div> 
                        </div>
                       <div className="col-lg-1"></div>
                   </div>
                   <div className="row">
                       <div className="col-lg-4 offset-4">
                            <div className="mt-4 text-center">
                                <button className="btn btn-primary rounded" onClick={savePDetails}>Update</button>
                            </div>
                       </div>                       
                   </div>
                </div>
            </div>
        </div>
    );
}

export default DrBookings;


{/* <div className="mt-2">
                                    <label>City</label>
                                    <input type="text" className="form-control" value={userone.city} />
                                </div>  */}
{/* <div className="mt-2">
                                    <label>Mode</label>
                                    <input type="text" className="form-control" value={userone.mode} />
                                </div> */}

                                // <div className="mt-2">
                                //     <label>Details</label>
                                //     <textarea className="form-control" onChange={obj=>updatepDetails(obj.target.value)} value={pdetails}></textarea>
                                // </div>  
                                // <div className="mt-2">
                                //     <label>Symptoms</label>
                                //     <textarea className="form-control" onChange={obj=>updatepSymptons(obj.target.value)} value={psymptoms}></textarea>
                                // </div>                               
                                // <div className="mt-2">
                                //     <label>Medicines</label>
                                //     <textarea className="form-control" onChange={obj=>updatepMedicine(obj.target.value)} value={pmedicine}></textarea>
                                // </div>          
                                // <div className="mt-2">
                                //     <label>Diagnosis</label>
                                //     <textarea className="form-control" rows="3" onChange={obj=>updatepDiagnosis(obj.target.value)} value={pdiagnosis}></textarea>
                                // </div>     
                                // <div className="mt-4 text-center">
                                //     <button className="btn btn-primary rounded" onClick={savePDetails}>Update</button>
                                // </div>


// import React, { useEffect, useState } from "react";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'

// const DrBookings = () => {

//     const [name, pickName] = useState("");
//     const [mobile, pickMobile] = useState("");
//     const [email, pickEmail] = useState("");
//     const [diagnosis, pickDiagnosis] = useState("");
//     const [medicine, pickMedicine] = useState("");
//     const[attend,pickAttened]=useState("");
//     const [details, pickDetails] = useState("");
//     const [symptoms, pickSymptoms] = useState("");
//     const [message, updateMessage] = useState("")

//     const [appointments, updateAppointments] = useState([]);
//     const [userone, updateOne] = useState({});
//     const [bookingdate, updateBookingdate] = useState("");
//     const [appointementid, updateappointementid] = useState("")
    

//     const editPatient = (index) => {
//         updateOne(appointments[index]);
//         updateappointementid(appointments[index].aid)
//         pickName(appointments[index].name)
//         pickMobile(appointments[index].phone)
//         pickEmail(appointments[index].email)
//     }


//     const getDocBookings = () => {
//         let input = { "doctorid": localStorage.getItem("id"), "bookingdate": bookingdate };
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(input)
//         };
//         fetch('https://www.medicalplanet.in/webapi/Doctor/getbooking', requestOptions)
//             .then(response => response.json())
//             .then(data => {
               
//                 if (data.length > 0) {
//                     updateAppointments(data);                                                                    //after fetching data we pass it to a state() in a form of array ,then we show it by using variable in page using map()
//                     updateOne(data[0]);
//                     pickName(data[0].name);
//                     pickMobile(data[0].phone);
//                     pickEmail(data[0].email);

//                 }

//             });
//     }



//     const savePateint = () => {

//         let input = {
//             "name": name,
//             "email": email,
//             "mobile": mobile,
//             "diagnosis": diagnosis,
//             "medicine": medicine,
//             "details": details,
//             "symptoms": symptoms,
//             "doctorid": localStorage.getItem("id"),
//             "appointmentid": appointementid
//         };
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(input)
//         };
//         fetch('https://www.medicalplanet.in/webapi/doctor/savepatient', requestOptions)
//             .then(response => response.text())
//             .then(data => {
//                 updateMessage(data);
//             })

//     }

//     useEffect(() => {
//         getDocBookings();

//     }, [1]);

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 {/* <h4 className="text-center text-primary">Dr. {localStorage.getItem("name")} Appointments : {appointments.length}</h4> */}
//                 <div className="col-lg-3  bgcolor2 scroll text-white  p-3 px-5">
//                     <h4 className="text-warning fontweight mt-4">Patient Name</h4>
//                     <hr className="m-0 p-0" />
//                     <div className="patient">
//                         {
//                             appointments.map((pdata, index)=>{
//                                 //  <div className="hover">  
//                                 return(                                                 
//                                     <div key={index} onClick={editPatient.bind(this, index)} className="text-center border rounded m-1 p-2 hover" >   
                                                                         
//                                         <p>{index + 1}  : {pdata.name} </p>
//                                         <p> {pdata.phone} </p>  
//                                         <p>Time: {pdata.slot}</p>                                          
//                                     </div>
                                                                             
//                                 )     
//                                 // </div>                                     
//                             })  
//                         }
//                     </div>
//                 </div>
//                 <div className="col-lg-9 bgcolor  p-3 px-5  text-white">

//                     <div className="row">
//                         <div className="col-lg-1">

//                         </div>

//                         <div className="col-lg-5">
//                             <div className="row mt-4">
//                                 <div className="col-lg-9">
//                                     <DatePicker
//                                         className="form-control"
//                                         selected={bookingdate}
//                                         onChange={date => updateBookingdate(date)}
//                                         dateFormat='yyyy-MM-dd'
//                                     />
//                                     {/* <input type="text" className="form-control" value={bookingdate}  onChange={date => updateBookingdate(date.target.value)}/> */}

//                                 </div>
//                                 <div className="col-lg-3 m-0 p-0">
//                                     <button className="btn btn-primary  btn-sm" onClick={getDocBookings} >Search</button>
//                                     <p>{message}</p>
//                                 </div>

//                             </div>
//                             <h4 className="text-warning  fontweight mt-4">Appointment Details</h4><hr />
//                         </div>
//                         <div className="col-lg-6"></div>
//                     </div>

//                     <div className="row mt-3 scrollp">
//                         <div className="col-lg-1"></div>
//                         <div className="col-lg-5 ">
//                             <div>
//                                 <label>Appointment ID</label>
//                                 <input type="text" className="form-control" value={userone.aid} readOnly />
//                             </div>
//                             <div className="mt-2">
//                                 <label>Mobile</label>
//                                 <input type="text" className="form-control" value={mobile} onChange={obj=>pickMobile(obj.target.value)} />
//                             </div>
//                             <div className="mt-2">
//                                 <label>Attended</label>
//                                 <select className="form-select" value={attend} onChange={obj=>pickAttened(obj.target.value)}>
//                                     <option>NO</option>
//                                     <option>YES</option>
//                                 </select>
//                             </div>

//                             <div className="mt-2">
//                                 <label>Details</label>
//                                 <textarea className="form-control" value={details} onChange={obj => pickDetails(obj.target.value)}></textarea>
//                             </div>
//                             <div className="mt-2">
//                                 <label>Symptoms</label>
//                                 <textarea className="form-control" value={symptoms} onChange={obj => pickSymptoms(obj.target.value)}></textarea>
//                             </div>
//                             <div className="mt-4">
//                                 <button className="btn btn-primary rounded" onClick={savePateint}>Update</button>
//                             </div>

//                         </div>

//                         <div className="col-lg-5 ">
//                             <div>
//                                 <label>Name</label>
//                                 <input type="text" className="form-control" value={name} onChange={obj => pickName(obj.target.value)} />
//                             </div>
//                             <div className="mt-2">
//                                 <label>Email</label>
//                                 <input type="text" className="form-control" value={email} onChange={obj => pickEmail(obj.target.value)} />
//                             </div>
//                             <div className="mt-2">
//                                 <label>Mode</label>
//                                 <input type="text" className="form-control" value={userone.mode} />
//                             </div>
//                             {/* <div className="mt-2">
//                                 <label>City</label>
//                                 <input type="text" className="form-control" value={userone.city} />
//                             </div> */}
//                             <div className="mt-2">
//                                 <label>Diagnosis</label>
//                                 <textarea className="form-control" value={diagnosis} onChange={obj => pickDiagnosis(obj.target.value)}></textarea>
//                             </div>
//                             <div className="mt-2">
//                                 <label>Medicines</label>
//                                 <textarea className="form-control" value={medicine} onChange={obj => pickMedicine(obj.target.value)}></textarea>
//                             </div>
//                         </div>
//                         <div className="col-lg-1"></div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// }

// export default DrBookings;