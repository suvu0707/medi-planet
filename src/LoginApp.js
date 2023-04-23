import React from 'react';
import { HashRouter,Routes,Route } from 'react-router-dom';
import Login from './login';
import Mainheader from './Mainheader';


function LoginApp() {
  return (
     <HashRouter>
        <Mainheader/>
       
        <Routes>
          <Route exact path="/" element={<Login/>}/>          
        </Routes>

     </HashRouter>
  );
}

export default LoginApp;
