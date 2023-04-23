import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
// import Booking from './booking';
import DocBookings from './docBookings';
import Doctorheader from './doctorheader';
import Doctorprofile from './doctorprofile';
import BookingSlots from './bookingslots';
// import Slots from './slot';
// import Editdoctor from './editdoctor';
import Patient from './patient';
import Deleteslots from './deleteslots';
import EditDoctorProfile from './editdoctor';


function Appdoctor() {
  return (
    <HashRouter>
      <Doctorheader />
      <Routes>
        <Route exact path="/" element={<DocBookings />} />
        <Route exact path="/dprofile" element={<Doctorprofile />} />
        <Route exact path="/edprofile" element={<EditDoctorProfile />} />
        {/* <Route exact path="/edoctor/:did" element={<Editdoctor />} /> */}
        <Route exact path="/slot" element={<BookingSlots />} />
        <Route exact path="/dslot" element={<Deleteslots />} />
        <Route exact path="/patient" element={<Patient />} />

      </Routes>
    </HashRouter>
  )
}

export default Appdoctor;