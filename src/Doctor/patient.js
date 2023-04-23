import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';

function Patient() {
    const [pdetails, updatePdetails] = useState([]);
    const [bookingdate, updateBookingdate] = useState("");

    const getPdetails = () => {

        let input = {
            "doctorid": localStorage.getItem("id"),
            "hospitalid":localStorage.getItem("hospitalid"),
            "type":localStorage.getItem("type"),
            "bookingdate": bookingdate
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
    useEffect(() => {
        getPdetails();
    }, [1])

    return (
        <div className="container">
            <div className="row mt-5">
            <div className="col-lg-4"><h3 className=' text-primary mb-4'>Patient Details</h3></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <DatePicker
                        className="form-control"
                        selected={bookingdate}
                        onChange={date => updateBookingdate(date)}
                        dateFormat='yyyy-MM-dd'
                    />
                     </div>
                    {/* <input type="text" className="form-control" value={bookingdate}  onChange={date => updateBookingdate(date.target.value)}/> */}

                    <div className="col-lg-1">
                        <button className="btn btn-primary  btn-sm" onClick={getPdetails} >Search</button>
                    </div>


               
                

                <div className="col-lg-12">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Appointment Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Diagnosis</th>
                                <th>Medicine</th>
                                <th>Symptons</th>
                                <th>Last Visit</th>
                                <th>Fee</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pdetails.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{info.pid}</td>
                                            <td>{info.name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.mobile}</td>
                                            <td>{info.diagnosis}</td>
                                            <td>{info.medicine}</td>
                                            <td>{info.symptoms}</td>
                                            <td>{info.lastvisit}</td>
                                            <td>{info.fee}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {/* <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    /> */}
                </div>
            </div>
        </div >


    )
}

export default Patient