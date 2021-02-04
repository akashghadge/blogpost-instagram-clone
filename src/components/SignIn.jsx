import React, { useState } from "react"
import ReactDOM from "react-dom"

import axios from "axios"
import AccountBox from "@material-ui/icons/AccountBox"
import { Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"


const SignIn = () => {
    let history = useHistory();
    let [allCurrentData, setAllCurrentData] = useState({
        username: "",
        password: ""
    })
    function inputChange(event) {
        const { id, value } = event.target
        // console.log(id, value);
        setAllCurrentData((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }


    function SendUser(event) {
        event.preventDefault()
        if (allCurrentData.username.length > 5 && allCurrentData.password.length > 8) {
            // setFinalData({
            //     username: allCurrentData.username,
            //     password: allCurrentData.password
            // })
            axios.post("http://localhost:5000/api/user/in", {
                username: allCurrentData.username,
                password: allCurrentData.password
            }).then((data) => {
                // window.location.reload(true);
                // console.log("User Sign In successfully");
                // console.log(data);
                let token = data.data.jwt;
                // console.log(token);
                localStorage.setItem("token", token);
                setAllCurrentData({
                    username: "",
                    password: ""
                })
                history.push("/");
            }).catch(() => {
                alert("Incorrect username or password");
            })
        }

        else {
            alert("Please enter first and last name min 3 letters and username is 5 letters and password 8 letters");
        }
    }

    return (
        <>
            <div className="container my-5 px-5">
                <h1 className="signInHeding">Sign In</h1>
                <div className="row widthSignIn my-4" style={{ wordSpacing: "10px" }}>
                    <div className="mb-3 signInUpText mx-1">
                        <label >UserName</label>
                        <input type="text" className="form-control inputFieldSignInUp" id="username" placeholder="akash@3" onChange={inputChange} value={allCurrentData.username} required style={{ boxShadow: "none" }}></input>
                    </div>
                    <div className="mb-3 signInUpText">
                        <label >Password</label>
                        <input type="password" className="form-control inputFieldSignInUp" id="password" onChange={inputChange} value={allCurrentData.password} required style={{ boxShadow: "none" }}></input>
                    </div>
                </div>
                <div className="my-3 mx-2">
                    <Button id="addContactUs " className="buttonSignIn" onClick={SendUser}>Save <AccountBox></AccountBox></Button>
                </div>
            </div>
        </>
    )
}
export default SignIn;
