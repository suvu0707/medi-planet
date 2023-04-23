import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Doctor from '../Hospital/doctor';
import Editpatient from '../Hospital/editpatient';
// import Lab from '../Hospital/lab';
import HospitalLabs from './labs11';
import Patient from '../Doctor/patient';
import Staff from '../Hospital/staff';
import Apppointment from '../Staff/apppointment';
import Edittappointment from '../Staff/edittappointment';
import Newpatient from '../Staff/newpatient';
import Clinicheader from './clinicheader';
import Dashboard from './dashboard';
import Clinicprofile from './clinicprofile';
import Editclinicprofile from './editclinicprofile';
import Billings from '../Hospital/billings';
import Allpatients from './allpatients';
import Pharma from './pharma';
// import Addpharma from './addpharma';
import Mycart from './mycart';
import ExportPdfComponent from './export';


function Clinicapp() {
  return (
    <HashRouter>
      <Clinicheader />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/doctor" element={<Doctor />} />
        <Route exact path="/staffs" element={<Staff />} />
        {/* <Route exact path="/patients" element={<Patient />} /> */}
        <Route exact path="/epatient/:pid" element={<Editpatient />} />
        <Route exact path="/allpatients" element={<Allpatients />} />
        {/* <Route exact path="/labs" element={<Lab />} /> */}
        <Route exact path="/labs" element={<HospitalLabs />} />
        <Route exact path="/bill" element={<Billings />} />
        <Route exact path="/appointment" element={<Apppointment />} />
        <Route exact path="/etappoint/:pid" element={<Edittappointment />} />
        <Route exact path="/npatient" element={<Newpatient />} />
        <Route exact path="/patient" element={<Patient />} />
        <Route exact path="/clinic" element={<Clinicprofile />} />
        <Route exact path="/eclinic" element={<Editclinicprofile />} />
        <Route exact path="/pharma" element={<Pharma />} />
        <Route exact path="/mycart" element={<Mycart />} />
        {/* <Route exact path="/addpharma" element={<Addpharma />} /> */}
        <Route exact path="/addpharma" element={<ExportPdfComponent />} />

        


      </Routes>
    </HashRouter>
  )
}

export default Clinicapp