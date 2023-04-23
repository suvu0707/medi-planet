import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Billings from './billings';
import Dashboard from './dashboard';
import Doctor from './doctor';
import Editpatient from './editpatient';
import Hospitalheader from './hospitalheader';
import Lab from './lab';
import Patient from './patient';
import Pharma from './pharma';
import Staff from './staff';

function Apphospital() {
  return (
    <HashRouter>
      <Hospitalheader />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/doctor" element={<Doctor />} />
        <Route exact path="/staffs" element={<Staff />} />
        <Route exact path="/patients" element={<Patient />} />
        <Route exact path="/epatient/:pid" element={<Editpatient />} />
        <Route exact path="/labs" element={<Lab />} />
        {/* <Route exact path="/pharma" element={<Pharma />} /> */}
        <Route exact path="/bill" element={<Billings />} />

      </Routes>
    </HashRouter>
  )
}

export default Apphospital