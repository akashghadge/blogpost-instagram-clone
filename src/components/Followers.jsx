import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom"

import axios from "axios"
const Followers = () => {
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

    let [follwers, setFollowers] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:5000/api/follow/followers/me", {
            username: username
        }).then((data) => {
            setFollowers(data.data)
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
                    marginTop: "20px"
                }} className="followHeading">Followers</h2>
                <ul className="serachList">
                    {
                        follwers.length == 0 ? <h1 >No follower present</h1>
                            :
                            follwers.map((elem, index, arr) => {
                                return <li className="listElement" name={elem.fusername} onClick={clickedUser}>{elem.fusername}</li>
                            })
                    }
                </ul>
            </div>
        </>
    )
}
export default Followers;
