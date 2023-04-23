import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import ReactPaginate from 'react-paginate';
const PER_PAGE = 6;
function Deleteslots() {
    const [slotlist, updateSlotlist] = useState([]);
    const [message, updateMessage] = useState("");
    const [search, setSearch] = useState('');

    const getSlotlist = () => {
        let input = { "doctorid": localStorage.getItem("id"),"hospitalid":localStorage.getItem("hospitalid")};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/getmyslots', requestOptions)
            .then(response => response.json())
            .then(data => {
                updateSlotlist(data);
                // alert(data.length);
            });
    }

    useEffect(() => {
        getSlotlist()
    }, [1]);
    // --------------------------Delete Slot-------------------------------------------------
    const deleteSlot = (sid) => {
        let input = {
            "doctorid": localStorage.getItem("id"),
            "hospitalid":localStorage.getItem("hospitalid"),
            "slotid": sid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Doctor/cancelslot', requestOptions)
            .then(response => response.text())
            .then(data => {
                updateMessage(data);
                getSlotlist();
            });
    }

    // -----------------------------Pagination--------------------------------------------
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE;
    const curreentPageData = slotlist.filter((info) =>
        info.datemonth.includes(search) ||
        info.slot.includes(search) ||
        info.slotid.includes(search)
    )
        .slice(offset, offset + PER_PAGE).map((info, index) => {
            return (
                <tr key={index} className='align-middle'>
                    {/* <td>{info.doctorid}</td> */}
                    <td>{info.slotid}</td>
                    <td>{info.slot}</td>
                    <td>{info.datemonth}</td>
                    <td>{info.available}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={deleteSlot.bind(this, info.slotid)}><i className='fa fa-trash'></i></button></td>
                </tr>
            )
        })
    const pageCount = Math.ceil(slotlist.length / PER_PAGE)


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-12">
                    <h3 className="text-center text-primary mb-4">Your Scheduled Slots</h3>
                    <p className="text-success text-center">{message}</p>
                    <div className="row">
                        <div className="col-lg-4 mb-2">
                            <input type="date-time" placeholder="Search Your Slot by time/slotid/date" onChange={obj => setSearch(obj.target.value)} className="form-control" />
                        </div>
                        <div className="col-lg-8"></div>
                    </div>

                    <table className=" table table-bordered table-sm">
                        <thead className='bg-warning'>
                            <tr>
                                {/* <th> Doctor Id </th> */}
                                <th> Slot Id</th>
                                <th> Slot Time </th>
                                <th> Date </th>
                                <th> Available </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {curreentPageData}
                            {/* {
                                slotlist
                                .filter(({ datemonth }) => {
                                    return datemonth.indexOf(search) >= 0;  })
                                    .map((info, index) => {
                                    return (
                                        <tr key={index} className='align-middle'>
                                            <td>{info.doctorid}</td>
                                            <td>{info.slotid}</td>
                                            <td>{info.slot}</td>
                                            <td>{info.datemonth}</td>
                                            <td>{info.available}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={deleteSlot.bind(this, info.slotid)}><i className='fa fa-trash'></i></button></td>
                                        </tr>
                                    )
                                })
                            } */}
                        </tbody>
                    </table>

                    {/* <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav> */}

                    <div className="m-3 text-center">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination_link"}
                            nextLinkClassName={"pagination_link"}
                            activeClassName={"pagination_link"}
                            disabledClassName={"pagination_link--disabled"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deleteslots