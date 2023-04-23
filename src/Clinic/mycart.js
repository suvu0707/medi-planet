import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from "react-router-dom"

function Mycart() {
    const navigate=useNavigate()
    const [cartitem, updateCartitem] = useState([]);
    const [paymode, pickPaymode] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [message, updateMessage] = useState("");

    const getCartitem = () => {

        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "pateintid": localStorage.getItem("pateintid"),
            "orderid": localStorage.getItem("orderid"),
            "id": localStorage.getItem('id')
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Cart/getcartitem', requestOptions)
            .then(response => response.json())
            .then(data => {
                updateCartitem(data)
                console.log(data)
            });

    }

    useEffect(() => {
        getCartitem()
    }, [1]);

    const pay = () => {
        if (paymode === "Chooes") {
            updateMessage("Select Payment Mode")
        } else {
            let input = {
                "hospitalid": localStorage.getItem("hospitalid"),
                "pateintid": localStorage.getItem("patientid"),
                "orderid": localStorage.getItem("orderid"),
                "id": localStorage.getItem('id'),
                "total": sum,
                "mode": paymode
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };
            fetch('https://www.medicalplanet.in/webapi/Cart/paynow', requestOptions)
                .then(response => response.text())
                .then(data => {
                    updateMessage(data)
                    setDisabled(false); 
                    console.log(data)
                });
        }

    }

    const printBill = () =>{
        updateCartitem([]);       
        localStorage.removeItem("patientid");
        localStorage.removeItem("orderid");
        localStorage.removeItem("productname"); 
        setDisabled(true);
        navigate("/bill")
    }


    
    var sum = cartitem.reduce((total, currentValue) => total = total + parseInt(currentValue.total), 0);
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-lg-12">
                    <h3 className='text-center text-info'>Cart Item</h3>
                    <p className='text-center text-danger'>{message}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-9">
                    <div className="card">
                        <div className="card-header">
                            <h4 className='text-center text-primary align-midle m-0'>Item List <span className='margin'><Link className="btn btn-primary btn-sm" to="/pharma">Add New Item</Link></span></h4>
                        </div>
                        <div className="card-body">
                            <table className=" table table-bordered ">
                                <thead className='bg-warning'>
                                    <tr>
                                        <th>Item No</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartitem.map((info, index) => {
                                            return (
                                                <tr className='align-middle' key={index}>
                                                    <td>{info.productid}</td>
                                                    <td>{info.productname}</td>
                                                    <td>{info.priceperunit}</td>
                                                    <td>{info.quantity}</td>
                                                    <td>{info.total}</td>
                                                    <td><button className='btn btn-danger'><i className='fa fa-trash'></i></button></td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                                <tfoot className='bg-warning'>
                                    <tr>
                                        <th colSpan='4' className='text-end'>Total :</th>
                                        <th colSpan='2' >Rs. {sum}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className='text-center text-primary align-midle m-0'>Payment Details</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className='mb-1'>Payment Mode</label>
                                <select className='form-select' onChange={obj => pickPaymode(obj.target.value)}>
                                    <option value="Chooes">Chooes</option>
                                    <option>Debit Card</option>
                                    <option>Credit Card</option>
                                    <option>UPI</option>
                                    <option>Pay On Delivery</option>
                                </select>
                            </div>
                            <div className="mb-3 text-center ">
                                <button className='btn btn-primary btn-sm mx-2' onClick={pay}>Pay Now</button>
                                <button className="btn btn-warning m-1" onClick={printBill} disabled={disabled}>Print Bill</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mycart