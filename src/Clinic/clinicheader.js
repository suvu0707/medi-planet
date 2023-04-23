import React from "react";
import { Link } from "react-router-dom";

const Clinicheader = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg">
                <div className="container-fluid px-5  px-lg-3">
                    <Link className="navbar-brand text-warning py-1  fontweight" to="/"><i className="fa fa-heartbeat"></i>  Medical Planet</Link>
                    <button className="navbar-toggler m-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon m-0 p-0"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link drop-down  text-white fontweight" to="/"><i className="fa fa-dashboard"></i>    Dashboard </Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 dropdown">
                                <a className="nav-link dropdown-toggle text-white fontweight" href="javascript:void(0)" role="button" data-bs-toggle="dropdown"><i className="fa fa-users"></i> Patient Zone</a>
                                <ul className="dropdown-menu bg width">
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/npatient"><i className="fa fa-plus-square"></i> Register New Patients</Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/appointment"><i className="fa fa-calendar-check-o"></i>  Today Appontments </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/patient"><i className="fa fa-list-alt"></i>  Completed Consultation </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/allpatients"><i className="fa fa-calendar-check-o"></i>  All Patients </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>


                                </ul>
                            </li>
                            <li className="nav-item dropdown py-1 py-lg-0 px-2 px-lg-2">
                                <a className="nav-link dropdown-toggle text-white fontweight" href="javascript:void(0)" role="button" data-bs-toggle="dropdown"><i className=" fa fa-user"></i> Accounts</a>
                                <ul className="dropdown-menu width bg">
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 ">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/doctor"><i className=" fa fa-user-md"></i>    Doctor </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/staffs"><i className="fa fa-users"></i>  Staffs</Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 ">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/bill"><i className="fa fa-medkit"></i> Billings</Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                </ul>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link drop-down  text-white fontweight" to="/labs"><i className="fa fa-flask"></i> Labs</Link>
                            </li>
                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <Link className="nav-link drop-down  text-white fontweight" to="/pharma"><i className="fa fa-medkit"></i> Pharma</Link>
                            </li>

                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 dropdown">
                                <a className="nav-link dropdown-toggle text-white fontweight" href="javascript:void(0)" role="button" data-bs-toggle="dropdown"><i className=" fa fa-gears"></i> Settings</a>
                                <ul className="dropdown-menu width bg">
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 ">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/clinic"><i className=" fa fa-edit"></i>    Clinic Profile </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    <li className="nav-item py-1 py-lg-0 px-2 px-lg-2 ">
                                        <Link className="nav-link drop-down  text-white fontweight" to="/addpharma"><i className=" fa fa-plus"></i>    Pharma Inventry </Link>
                                    </li>
                                    <li><hr className="dropdown-divider text-white" /></li>
                                    
                                </ul>
                            </li>

                            <li className="nav-item py-1 py-lg-0 px-2 px-lg-2">
                                <a className=" nav-link pointer text-warning" > Welcome - {localStorage.getItem("name")} <i className="fa fa-power-off text-danger fontweight" onClick={logout} > Logout </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> <br /><br />
        </>
    )
}

export default Clinicheader;


const logout = () => {
    localStorage.clear();
    window.location.reload();
}

