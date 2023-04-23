import React from "react";
import { Link } from "react-router-dom";

const Staffheader = () => {
    return (
        <><nav className="navbar navbar-expand-sm fixed-top navbar-dark bg">
            <div className="container px-5  px-lg-3">
                <Link className="navbar-brand text-warning py-1   fontweight" to="/"><i className="fa fa-heartbeat"></i>  Medical Planet</Link>
                <button className="navbar-toggler m-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon m-0 p-0"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ms-auto ">
                        <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                            <Link className="nav-link menu text-white fontweight" to="/"><i className="fa fa-calendar-check-o"></i>  Appontment </Link>
                        </li>
                        <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                            <Link className="nav-link menu text-white fontweight" to="/npatient"><i className="fa fa-plus-square"></i> New Patients</Link>
                        </li>
                        <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                            <Link className="nav-link menu text-white fontweight" to="/booking"><i className="fa fa-plus-square"></i> Booking</Link>
                        </li>
                        <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                            <a className=" nav-link pointer text-warning" onClick={logout}>
                                <i className="fa fa-power-off text-danger" > </i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> <br /><br /><br />
        </>
    )
}

export default Staffheader


const logout = () => {
    localStorage.clear();
    window.location.reload();
}

          

