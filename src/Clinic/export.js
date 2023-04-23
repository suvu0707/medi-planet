import React from 'react';
import ReactToPrint from 'react-to-print';
import Addpharma from './addpharma';
 
const ExportPdfComponent=()=> {
     
      return (
        <div>

           <h1>Export HTMl Table in PDF File</h1> 

          <Addpharma ref={(response) => (React.forwardRef = response)} />
          
          <ReactToPrint
            content={() => React.forwardRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
        </div>
      );
   
}
 
export default ExportPdfComponent;