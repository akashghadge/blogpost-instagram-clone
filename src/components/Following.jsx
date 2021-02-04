import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom"

import axios from "axios"
const Following = () => {
    // let [fname, setFname] = useState("");
    // let [lname, setLname] = useState("");
    // let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");

    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/profile", {
        token: token
    }).then((data) => {
        setUsername(data.data.username);
        // setFname(data.data.fname);
        // setLname(data.data.lname);
        // setEmail(data.data.email);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })

    let [follwing, setFollowing] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:5000/api/follow/following/me", {
            username: username
        }).then((data) => {
            setFollowing(data.data)
            // console.log(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [username]);

    function clickedUser(e) {
        let pUsername = e.target.innerText;
        // console.log(pUsername);
        history.push(`/public/${pUsername}`);
    }
    return (
        <>
            <div className="text-center">
                <h2 style={{
                    fontStyle: "italic",
                    marginTop: "20px",
                }} className="followHeading">Following</h2>
                <ul className="serachList">
                    {
                        follwing.length == 0 ? <h1>you not follow anyone</h1>
                            :
                            follwing.map((elem, index, arr) => {
                                return <li className="listElement" onClick={clickedUser}>{elem.fusername}</li>
                            })
                    }
                </ul>
            </div>
        </>
    )
}
export default Following;
