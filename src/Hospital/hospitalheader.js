import React from "react";
import { Link } from "react-router-dom";

const Hospitalheader = () => {
    return (
        <>
             <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg">
                <div className="container px-5  px-lg-3">
                <Link className="navbar-brand text-warning py-1   fontweight" to="/"><i className="fa fa-heartbeat"></i>  Medical Planet</Link> 
                <button className="navbar-toggler m-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon m-0 p-0"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/"><i className="fa fa-dashboard"></i>    Dashboard </Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/doctor"><i className=" fa fa-user-md"></i>    Doctor </Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/staffs"><i className="fa fa-users"></i>  Staffs</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/patients"><i className="fa fa-bed"></i> Patients</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/labs"><i className="fa fa-flask"></i> Labs</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/pharma"><i className="fa fa-medkit"></i> Pharma</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link menu text-white fontweight" to="/bill"><i className="fa fa-medkit"></i> Biilings</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2"> 
                                <a className=" nav-link pointer text-warning" >  <i className="fa fa-power-off text-danger fontweight" onClick={logout} > Logout </i> 
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> <br /><br /><br />
        </>
    )
}

export default Hospitalheader;


const logout = () => {
    localStorage.clear();
    window.location.reload();
}

