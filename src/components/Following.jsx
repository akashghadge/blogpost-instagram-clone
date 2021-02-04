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
            console.log(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [username]);


    return (
        <>
            <div className="text-center">
                <h2 style={{
                    fontStyle: "italic",
                    marginTop: "20px",
                }}>Following</h2>
                <ul>
                    {
                        follwing.length == 0 ? <h1>you not follow anyone</h1>
                            :
                            follwing.map((elem, index, arr) => {
                                return <h4>{elem.fusername}</h4>
                            })
                    }
                </ul>
            </div>
        </>
    )
}
export default Following;
