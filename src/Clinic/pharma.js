import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from "react-toastify";

const PER_PAGE = 5;

function Pharma() {
    const [medlist, updateMedlist] = useState([]);
    const [search, updateSearch] = useState([]);
    const [qty, updateQty] = useState("");
    const [cqty, updateCqty] = useState(0);
    const [message, updateMessage] = useState("");

    
    const getAllmedlist = async () => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };

        const res = await fetch("https://www.medicalplanet.in/webapi/Cart/myproduct", requestOptions);
        const data = await res.json();
        if (data.length > 0) {
            updateMedlist(data);
           
        }
            
    }
    useEffect(() => {
        getAllmedlist();

    }, [1]);

    const deleteProduct = async (pid) => {
        let input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "productid": pid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };

        const res = await fetch("https://www.medicalplanet.in/webapi/Cart/deleteone", requestOptions);
        const data = await res.text();
        getAllmedlist();
        updateMedlist([]);
        toast.success( " Deleted successfully"); 

    }

    
    const addTocart =  (pid, pprice, quantity) => {

           
        if (qty == 0) {
            updateMessage(" Plz select item quantity");
        }
        else if (qty>quantity) {
            updateMessage(" Plz select valid item quantity");
        }
       
        else {
            let input = {
                "hospitalid": localStorage.getItem("hospitalid"),
                "id": localStorage.getItem("id"),
                "productid": pid,
                "qty": qty,
                "price": pprice,
                "orderid": localStorage.getItem("orderid"),
                "pateintid": localStorage.getItem("patientid"),
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };

            fetch("https://www.medicalplanet.in/webapi/Cart/addtocart", requestOptions)
            .then(response => response.text())
                .then(data => {
            updateMessage(data);
            updateCqty(cqty + 1);
            console.log(data);
            // window.location.reload();

        })
        }
    }


    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(medlist.length / PER_PAGE)


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className='col-lg-4 text-center'>
                    <h3 className='text-info '>Available Medicines : {medlist.length} </h3>

                </div>
                <div className="col-lg-4 text-end">
                    {/* <Link  className="btn btn-primary" to='/mycart'>
                        <i className='fa fa-shopping-cart mx-3'></i>
                        My Cart <span className="badge bg-danger"> {cqty}</span>
                    </Link> */}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-4 d-flex align-items-center">
                    <input type="text" className='form-control' placeholder='Search Medicines by Name/ Product Id' onChange={obj => updateSearch(obj.target.value)} />
                </div>
                <div className="col-lg-4">
                    <p className='tect-center text-danger'>{message}</p>

                </div>
                <div className="col-lg-4 text-end">
                    <Link className="btn btn-primary" to='/mycart'>
                        My Cart <span className="badge bg-danger"> {cqty}</span>
                    </Link>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <table className=" table table-bordered">
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Details</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                medlist.filter((info) =>
                                    info.productname.toLowerCase().includes(search) ||
                                    info.productname.toUpperCase().includes(search) ||
                                    info.productid.includes(search)
                                ).slice(offset, offset + PER_PAGE).map((info, index) => {
                                    return (
                                        <tr key={index} className="align-middle">
                                            <td>{info.productid}</td>
                                            <td>{info.productname}</td>
                                            <td>{info.details}</td>
                                            <td className={info.quantity <= 0 ? "text-danger" : ""}>{info.quantity <= 0 ? "Out Of Stock" : info.quantity} </td>
                                            <td>{info.price}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={deleteProduct.bind(this, info.productid)}><i className='fa fa-trash'></i></button>
                                            </td>
                                            <td className='d-flex align-items-center'>     
                                                
                                                    <input type="number" className='form-control textbox-width' placeholder='Qty' onChange={obj=>updateQty(obj.target.value)} />
                                                    {/* <button className='btn btn-primary btn-sm wid' disabled={info.quantity<=0 ? true : false} onClick={addTocart.bind(this,info.productid,info.price,info.productname)}> <i className='fa fa-cart-plus mx-3'></i></button>                                              */}
                                                    <button className='btn btn-primary btn-sm wid' disabled={info.quantity<=0 ? true : false} onClick={addTocart.bind(this,info.productid,info.price,info.quantity)}> <i className='fa fa-cart-plus mx-3'></i></button>                                             
                                            </td>                                               
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="mb-4  mt-4 ">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination   justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pharma