import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Login() {
    const [username, pickUsername] = useState("");
    const [password, pickPassword] = useState("");
    const [message, updateMessage] = useState("");
   

    const StyleR = {color : "red"}
    const StyleG={color : "green"}
    const[color,updateColor]=useState(StyleR)

    const loginCheck = async () => {
        const regEx = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
        // const regExp=/^(?=.?[A-Za-z])(?=.?[0-9]).{6,}$/
        if (username === "" || password === "") {
            updateMessage("Please fill all input-field")
        } else if  (!regEx.test(username) && username !== "") {
            updateMessage("Email is Not Valid");
          } else if(password.length<3 || password.length>16){
            updateMessage("Password should have more than 2 or less than 16 charecters");
          }
        //   else if  (!regExp.test(password) && password !== "") {
        //     updateMessage("Password is Not Valid");
        //   }
        else {
            updateMessage(" Please Wait Processing...")
            let input = {
                "email": username,
                "password": password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            };
            const res = await fetch('https://www.medicalplanet.in/webapi/Login/auth', requestOptions)
            const data = await res.json();
            updateMessage(data.status + " : " + data.message);
            updateColor(StyleG);
            console.log(data)

            if (data.status == "SUCCESS") {
                localStorage.setItem("id", data.id);
                localStorage.setItem("name", data.name);
                localStorage.setItem("hospitalid", data.hospitalid);
                localStorage.setItem("type", data.type);
                window.location.reload();

            }
        }
    }







    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4 offset-4">
                    <div className="card">
                        <div className="card-header text-center p-3  bg-light">
                            <h5 className='align-midle m-0'>Login to Medical Planet</h5>

                        </div>
                        <div className="card-body p-4">
                            <p className="text-center" style={color}>{message}</p>

                            <form onSubmit={loginCheck}>
                                <div className="input-group mb-4">
                                    <span className="input-group-text"><i className="fa fa-envelope fa-1x"></i></span>
                                    <input type="text" className="form-control" placeholder="Username" onChange={obj => pickUsername(obj.target.value)} />

                                </div>


                                <div className="input-group mb-4">
                                    <span className="input-group-text"><i className="fa fa-lock fa-1x"></i></span>
                                    <input type="password" className="form-control" placeholder="Password" onChange={obj => pickPassword(obj.target.value)} />

                                </div>
                                <div className="mb-2 fontweight m-0 d-grid">
                                    <button type="submit" className="btn btn-success m-0" >Login</button>
                                </div>
                            </form>
                            <hr />


                            <h6 className='text-center'><Link to="#" className="remove-line"> Forgot Password? </Link></h6>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login