import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

var PER_PAGE = 6;

function Hoc(WrappedComponent, input, url,dinput,did) {
    const Wrapped = () => {
        const [list, updateList] = useState([]);

        const getList = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };
            fetch("https://www.medicalplanet.in/webapi/" + url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    updateList(data);
                    console.log(data.length)
                })
        }

        useEffect(() => {
            getList();
        }, [1]);


        const deleteListItem = async (did) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dinput)
            };
    
            const res = await fetch("https://www.medicalplanet.in/webapi/Cart/deleteone", requestOptions);
            const data = await res.text();
            getList();
            // updateMedlist([]);
            // toast.success( " Deleted successfully"); 
    
        }




        const [currentPage, setCurrentPage] = useState(0);

        function handlePageClick({ selected: selectedPage }) {
            setCurrentPage(selectedPage)
        }

        const offset = currentPage * PER_PAGE;
        const pageCount = Math.ceil(list.length / PER_PAGE)

        return (
            <WrappedComponent
                list={list}
                delete={deleteListItem}
                offset={offset}
                perpage={PER_PAGE}
                pagination={
                    <div className="mb-4   mt-4">
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
                }

            />
        )
    }
    return Wrapped
}

export default Hoc