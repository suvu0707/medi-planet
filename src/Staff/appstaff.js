import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Apppointment from './apppointment';
import Staffheader from './staffheader';
import Edittappointment from './edittappointment';
import Newpatient from './newpatient';
import DrBookings from './bookingg';
// import EditAppointment from './editAppointment11';


function Appstaff() {
  return (
    <HashRouter>
      <Staffheader />
      <Routes>
        <Route exact path="/" element={<Apppointment />} />
        <Route exact path="/etappoint/:pid" element={<Edittappointment />} />
        <Route exact path="/npatient" element={<Newpatient />} />
        <Route exact path="/booking" element={<DrBookings />} />
      </Routes>
    </HashRouter>
  )
}

export default Appstaff;