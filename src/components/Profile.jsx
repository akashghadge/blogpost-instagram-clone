import React, { useState } from "react"
import ReactDOM from "react-dom"


import axios from "axios"
import { useHistory } from "react-router-dom"
const Profile = () => {
    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");

    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/profile", {
        token: token
    }).then((data) => {
        setFname(data.data.fname);
        setLname(data.data.lname);
        setUsername(data.data.username);
        setEmail(data.data.email);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })

    return (
        <>
            <h1>{fname} {lname} {email} {username}</h1>
        </>
    )
}
export default Profile;
