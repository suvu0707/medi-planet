import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const BookingSlots = () => {


    const [absent, updateabsent] = useState([]);

    // const [Dabsent, updateD] = useState("");
    const [Dfdate, updateDfdate] = useState(null);
    const [Dtodate, updateDtodate] = useState("");
    const [Dstart, updateDstart] = useState("");
    const [Dend, updateDend] = useState("");
    const [Dinterval, updateDinterval] = useState("");

    const [listSlot, updateSlot] = useState([]);
    const [msg, updatemsg] = useState("");
    // const [deactive, setDective] = useState('');
    const [deactive1, setDective1] = useState('');
    const [deactive2, setDective2] = useState('');
    const [deactive3, setDective3] = useState('');
    const [deactive4, setDective4] = useState('');
    const [deactive5, setDective5] = useState('');
    const [deactive6, setDective6] = useState('');
    const [deactive7, setDective7] = useState('');


    // const absentday = (oneday,disable) => {
    //     updateabsent(absent => [...absent, oneday]);
    //     setDective(disable);
    // }


    const absentday1 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective1("false");
    }
    const absentday2 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective2("false");
    }
    const absentday3 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective3("false");
    }
    const absentday4 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective4("false");
    }
    const absentday5 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective5("false");
    }
    const absentday6 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective6("false");
    }
    const absentday7 = (oneday) => {
        updateabsent(absent => [...absent, oneday]);
        setDective7("false");
    }

    var newArray = absent.filter(function (elem, pos) {
        return absent.indexOf(elem) == pos;
    });





    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

   
    const update = () => {
        let input = {
            "doctorid": localStorage.getItem("id"),
            "absent": newArray,
            "fromdate": Dfdate,
            "todate": Dtodate,
            "starttime": Dstart,
            "endtime": Dend,
            "interval": Dinterval,
            "hospitalid": localStorage.getItem("hospitalid")

        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/createslot', requestOptions)
            .then(response => response.text())
            .then(data => {
                updateSlot(data);
                updatemsg(data)
                setTimeout(window.location.reload(), 3000)

            });

    }




    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-12 mt-3">
                    <h3 className="text-primary text-center"> Booking Slots </h3>
                    <p className="text-center text-success"> {msg} </p>
                    <div className="row mt-4 rounded">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-2 text-end  p-3  text-info">
                            <h4> Absent Days : </h4>
                        </div>
                        <div className="col-lg-3 p-2 ">
                            <input type="text" className="form-control mt-2 mb-2" value={newArray} />
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            

                            <div className="btn-group">
                                <button className="btn  btn-primary mt-2" disabled={deactive1} onClick={absentday1.bind(this, 0)}> Sunday </button>

                                <button className="btn btn-danger mt-2" disabled={deactive2} onClick={absentday2.bind(this, 1)}> Monday </button>

                                <button className="btn btn-success mt-2" disabled={deactive3} onClick={absentday3.bind(this, 2)}> Tuesday </button>

                                <button className="btn btn-warning mt-2" disabled={deactive4} onClick={absentday4.bind(this, 3)}> Wednesday </button>

                                <button className="btn btn-info mt-2" disabled={deactive5} onClick={absentday5.bind(this, 4)}> Thursday </button>

                                <button className="btn btn-secondary mt-2" disabled={deactive6} onClick={absentday6.bind(this, 5)}> Friday </button>

                                <button className="btn btn-dark mt-2" disabled={deactive7} onClick={absentday7.bind(this, 6)}> Saturday </button>
                            </div>
                        </div>
                    </div>


                    <div className="row mt-4">

                        <div className="col-lg-2  text-primary"></div>
                        <div className="col-lg-2 text-end text-info d-flex align-items-center ">
                            <h4>  Start Time :</h4>
                        </div>

                        <div className="col-lg-2 text-end ">
                            <select className="form-select" onChange={obj => updateDstart(obj.target.value)}>
                                {
                                    numbers.map((index, number) => {
                                        return (
                                            <option key={index}> {number + 1} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>


                        <div className="col-lg-2   text-info d-flex align-items-center">
                            <h4>  End Time :</h4>
                        </div>

                        <div className="col-lg-2 text-start ">
                            <select className="form-select" onChange={obj => updateDend(obj.target.value)}>
                                {
                                    numbers.map((index, number) => {
                                        return (
                                            <option key={index}> {number + 1} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-lg-2  text-primary"></div>


                    </div>

                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-3 p-3  text-primary"> <b> Time For Each Consultion :  </b></div>
                        <div className="col-lg-3 p-2 ">
                            <select className="form-select mt-2 mb-2" onChange={obj => updateDinterval(obj.target.value)}>
                                <option>Select</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <div className="col-lg-2 p-3  text-primary"> <b> Minutes  </b></div>
                    </div>

                    <div className="row">
                        <div className="mb-2 mt-2 text-center">
                            {/* <button className="btn btn-primary" onClick={get}> Get My Slot </button> */}
                            <button className="btn btn-primary" onClick={update}> Update My Slot </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className="row">
                <div className="col-lg-12">
                    <table className="table shadow ">
                        <thead>
                            <tr>
                                <th> Doctor Id </th>
                                <th> Date Month</th>
                                <th> Slot </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listSlot.map((info, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {info.doctorid} </td>
                                            <td> {info.datemonth} </td>
                                            <td> {info.slot} </td>
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

export default BookingSlots;