import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";


const PER_PAGE = 5;

const Addpharma = () => {
    const [mname, setmName] = useState("");
    const [mprice, setmPrice] = useState("");
    const [mqty, setmQty] = useState("");
    const [mdetails, setmDetails] = useState("");
    // const [pppid, setPppid] = useState("");

    const [allMedicines, setAllMedicines] = useState([]);
    const [search, setSearch] = useState("");

    const saveMedicine = () => {

        if (mname === "" || mprice === "" || mqty === "" || mdetails === "") {
            toast.error("Enter all details");
        } else if (isNaN(mprice) || isNaN(mqty)) {
            toast.error("Price/Quantity has to be number");
        }
        else {
            var input = {
                hospitalid: localStorage.getItem("hospitalid"),
                "id": localStorage.getItem("id"),
                productname: mname,
                price: mprice,
                quantity: mqty,
                details: mdetails
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };
            fetch("https://www.medicalplanet.in/webapi/Cart/save", requestOptions)
                .then(response => response.text())
                .then(data => {
                    // setmName("");   setmPrice("");  setmQty("");    setmDetails("");
                    toast.success(data);
                    getAllMedicines();



                })
        }
    }

    const getAllMedicines = () => {
        var input = {
            "id": localStorage.getItem("id"),
            "hospitalid": localStorage.getItem("hospitalid")
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Cart/myproduct", requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setAllMedicines(data);
            })
    }

    const deleteMedicine = (medid) => {
        var input = {
            "hospitalid": localStorage.getItem("hospitalid"),
            "id": localStorage.getItem("id"),
            "productid": medid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Cart/deleteone", requestOptions)
            .then(response => response.text())
            .then(data => {
                getAllMedicines();
                toast.error(data);
            })
    }

    const clearData = () => {
        setmName(""); setmPrice(""); setmQty(""); setmDetails("");
    }

    const clearAll = () => {
        setSearch("");
        getAllMedicines();
    }

    useEffect(() => {
        getAllMedicines();
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allMedicines.length / PER_PAGE);

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <h4 className="text-center text-primary">Add New Medicine Details</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <div className="mt-2">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={obj => setmName(obj.target.value)} value={mname} />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mt-2">
                            <label>Price</label>
                            <input type="text" className="form-control" onChange={obj => setmPrice(obj.target.value)} value={mprice} />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="mt-2">
                            <label>Quantity</label>
                            <input type="text" className="form-control" onChange={obj => setmQty(obj.target.value)} value={mqty} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mt-2">
                            <label>Discription</label>
                            <input type="text" className="form-control" onChange={obj => setmDetails(obj.target.value)} value={mdetails} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="mt-2 text-center mt-4 ">
                            <button className="btn btn-primary m-1" onClick={saveMedicine}><i className="fa fa-save"></i> Save</button>
                            <button className="btn btn-warning m-1" onClick={clearData}><i className="fa fa-remove"></i> Clear</button>
                            <Link to="/pharma"><button className="btn btn-secondary m-1"><i className="fa fa-arrow-left"></i> Back</button></Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row '>
                    <div className='col-lg-3'>
                        <h4 className='text-primary'>Medicines: {allMedicines.length}</h4>
                    </div>
                    <div className='col-lg-6 text-center'></div>
                    <div className='col-lg-3'>
                        <div className="input-group">
                            <span className='input-group-text bg-white'><i className='fa fa-search'></i></span>
                            <input type="text" className="form-control" placeholder="ID/Name/Description" onChange={obj => setSearch(obj.target.value)} value={search} />
                            <button className=" btn btn-sm border bg-secondary" onClick={clearAll}><i className='fa fa-remove'></i></button>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-lg-12'>
                        <table className='table table-bordered table-sm text-center'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price/Unit</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allMedicines.filter(post => {
                                        if ((post.productname.toLowerCase().includes(search.toLowerCase())) ||
                                            (post.productid.includes(search)) ||
                                            (post.details.toLowerCase().includes(search.toLowerCase()))) {
                                            return post;
                                        }
                                    }).slice(offset, offset + PER_PAGE).map((mdata, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{mdata.productid}</td>
                                                <td>{mdata.productname}</td>
                                                <td>{mdata.details}</td>
                                                <td>{mdata.quantity}</td>
                                                <td>{mdata.price}</td>
                                                <td>
                                                    <button className='btn btn-danger btn-sm' onClick={deleteMedicine.bind(this, mdata.productid)}><i className='fa fa-trash'></i></button>
                                                </td>
                                                {/* <td className='d-flex align-items-center justify-content-center'>     
                                                {getDropdown(mdata.quantity)}                                                
                                                    <button className='btn btn-white text-primary btn-sm' data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Cart">
                                                    <i className='fa fa-cart-plus fa-2x'></i> 
                                                    </button>                                                
                                            </td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <div className="mb-4 mt-4">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
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
                <ToastContainer position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div>
        </>
    );
}

export default Addpharma;