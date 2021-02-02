import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button/Button"
import Posts from "./Posts"
import axios from "axios"


const Profile = () => {


    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");

    let history = useHistory();
    let token = localStorage.getItem("token");
    let [allPost, setAllPost] = useState([{}]);
    axios.post("http://localhost:5000/api/profile", {
        token: token
    }).then((data) => {
        setUsername(data.data.username);
        setFname(data.data.fname);
        setLname(data.data.lname);
        setEmail(data.data.email);
        axios.post("http://localhost:5000/api/post/", {
            username: data.data.username
        }).then((data) => {
            setAllPost(data.data)
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })




    return (
        <>
            <div className="mainProfile">
                <h3>{username}</h3>
                <p>{fname} {lname} <br></br>
                    <em style={{ color: "blue", fontFamily: "none" }}>{email}</em></p>
                <h6 style={{ wordSpacing: "8px" }}>Followers: {0}  Following: {0}</h6>
            </div>
            <hr></hr>
            <hr></hr>
            <div>
                <>
                    {allPost.map((elem, index, arr) => {
                        return <Posts delete={1} username={elem.username} title={elem.title} desc={elem.desc}></Posts>
                    })}
                </>
            </div>
        </>
    )
}
export default Profile;
