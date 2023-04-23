import React, { useEffect, useState } from 'react'

function Billings() {
  const[pdetails,updatePdetails]=useState([]);
  const [pharmaBilling, updatePharmaBilling] = useState([]);

  const getPDetails = () => {

    let input = {
        "doctorid": localStorage.getItem("id"),
        "hospitalid": localStorage.getItem("hospitalid"),
        "type": localStorage.getItem("type"),
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };
    fetch("https://www.medicalplanet.in/webapi/doctor/getpatient", requestOptions)
        .then(response => response.json())
        .then(data => {
            updatePdetails(data);
        })
}



    const printBill = () =>{
        var input = {
         "hospitalid": localStorage.getItem("hospitalid"),
         "id": localStorage.getItem("id")
        };
        const requestOptions = {
         method : 'POST',
         headers : {'Content-Type' : 'application/json'},
         body : JSON.stringify(input)
     };
     fetch("https://www.medicalplanet.in/webapi/Cart/pharmabill", requestOptions)
     .then(response => response.json())
     .then( data =>{
         console.log(data); 
         updatePharmaBilling(data);
     })
     }



useEffect(()=>{
  getPDetails()
  printBill();
},[])

const sum = pdetails.reduce((total, currentValue) => total = total + parseInt(currentValue.fee), 0);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-12">
          <h3 className="text-center text-info mb-4">Today's Hospital Billings</h3>
          <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Mobile</th>
                  <th>Doctor Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                    pdetails.map((info,index)=>{
                      return(
                        <tr key={index}>
                            <td>{info.pid}</td>
                            <td>{info.name}</td>
                            <td>{info.mobile}</td>
                            <td>{info.doctorname}</td>
                            <td>{info.fee}</td>
                        </tr>
                      )
                    })
                }
                <tr>
                  <td colspan="4" className='text-end'><b>Total : </b></td>
                  <td><b>{sum}</b></td>
                </tr>
              </tbody>

          </table>
        </div>
      </div>
      <div className="row mt-5">
                <div className="col-lg-12">
                <h3 className="text-center text-info mb-4">Today's Pharma Billing Details</h3>
                    <table className='table table-bordered'>
                        <thead className="bg-light">
                            <tr>
                                <th>PID</th>
                                <th>Patient Name</th>
                                <th>Mobile</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pharmaBilling.map((pdata, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{pdata.pid}</td>
                                            <td>{pdata.name}</td>
                                            <td>{pdata.mobile}</td>
                                            <td>{pdata.date}</td>
                                            <td>{pdata.total}</td>
                                            <td className="text-center">
                                                <a href={`https://www.medicalplanet.in/webapi/Cart/getpharmabill/${pdata.orderid}`} target="_blank"><i className="fa fa-download"></i></a>
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

export default Billings;



