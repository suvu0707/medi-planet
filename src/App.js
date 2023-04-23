import React from 'react'
import Clinicapp from './Clinic/clinicapp';
import Appdoctor from './Doctor/appdoctor';
import Apphospital from './Hospital/apphospital';
import LoginApp from './LoginApp';
import Appstaff from './Staff/appstaff';

function App() {
    // localStorage.clear()
    // if (localStorage.getItem("id") == null) {
    //     return (
    //         <>
    //             <LoginApp />
    //         </>
    //     )
    // } 
    // else if (localStorage.getItem("type") == "HOSPITAL") {
    //     return (
    //         <>
    //            <Apphospital />
    //         </>
    //     )
        
    // }else if (localStorage.getItem("type") == "STAFF") {
    //     return (
    //         <>
    //            <Appstaff />
    //         </>
    //     )
        
    // }else if (localStorage.getItem("type") == "DOCTOR") {
    //     return (
    //         <>
    //            <Appdoctor />
    //         </>
    //     )
        
    // }else if (localStorage.getItem("type") == "CLINIC") {
        return (
            <>
               <Clinicapp />
            </>
        )
        
    // }


}

export default App;
    