import React from "react";
import { Link } from "react-router-dom";

const Mainheader = () => {
    return ( 
        <>
            <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg">
                <div className="container-fluid px-5  px-lg-5">
                <Link className="navbar-brand text-white py-1 m-0   fontweight" to="/">Medical Planet</Link> 
                <button className="navbar-toggler m-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon m-0 p-0"></span>
                    </button>
                    <div className="coldlapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item py-2 py-lg-0 px-2 px-lg-2">
                                <a className="nav-link menu text-white fontweight"> New To Medical Planet ? <i className="fa fa-user-plus fa-1x mx-1 "></i>Register </a> 
                            </li>
                         
                        </ul>
                    </div>
                </div>
            </nav> <br /><br /><br />
        </>
    )
}

export default Mainheader;

// const logout = () =>{
//     localStorage.clear();
//     window.location.reload();
// }