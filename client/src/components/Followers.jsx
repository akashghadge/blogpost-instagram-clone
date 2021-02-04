import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom"

import axios from "axios"
const Followers = () => {
    let [loading, setLoading] = useState(true);


    // let [fname, setFname] = useState("");
    // let [lname, setLname] = useState("");
    // let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");

    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("/api/profile", {
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
        axios.post("/api/follow/followers/me", {
            username: username
        }).then((data) => {
            setFollowers(data.data)
            setLoading(false);
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
            {
                loading ? <h1>Loading ....</h1> :
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
            }
        </>
    )
}
export default Followers;
