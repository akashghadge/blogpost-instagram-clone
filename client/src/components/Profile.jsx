import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import ReactLoading from "react-loading"
import { useHistory } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Button from "@material-ui/core/Button/Button"
import Posts from "./Posts"
import axios from "axios"


const Profile = () => {
    let [loading, setLoading] = useState(true);

    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");

    let history = useHistory();
    let token = localStorage.getItem("token");
    // let [allPost, setAllPost] = useState([]);
    axios.post("/api/profile", {
        token: token
    }).then((data) => {
        // console.log(data);
        setUsername(data.data.username);
        setFname(data.data.fname);
        setLname(data.data.lname);
        setEmail(data.data.email);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })


    let [allPost, setAllPost] = useState([{}]);
    useEffect(() => {
        axios.post("/api/post/", {
            username: username
        }).then((data) => {
            setAllPost(data.data)
            // console.log(allPost);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [username]);

    // follwers count
    let [follwersCount, setFollowersCount] = useState(0);
    axios.post("/api/follow/followers/me/count", {
        username: username
    }).then((data) => {
        setFollowersCount(data.data)
        // console.log(data);
    }).catch((err) => {
        console.log(err);
    })

    // following count
    let [follwingCount, setFollowingCount] = useState(0);
    axios.post("/api/follow/following/me/count", {
        username: username
    }).then((data) => {
        setFollowingCount(data.data)
        // console.log(data);
    }).catch((err) => {
        console.log(err);
    })


    return (
        <>
            <div className="mainProfile">
                <h3>{username}</h3>
                <p>{fname} {lname} <br></br>
                    <em style={{ color: "blue", fontFamily: "none" }}>{email}</em></p>
                <NavLink to="/followers" className="nav-link" style={{ display: "inline" }}>
                    Followers:{follwersCount}
                </NavLink>
                <NavLink to="/following" className="nav-link" style={{ display: "inline" }}>
                    Following:{follwingCount}
                </NavLink>
            </div>
            <hr></hr>
            <hr></hr>
            <div>
                <>
                    {
                        loading ?
                            <>
                                <div style={{ position: "relative", textAlign: "center", display: "block", left: "50%", top: "40%" }}>
                                    <ReactLoading type={"bars"} color={"black"} height={"10%"} width={"10%"}></ReactLoading>
                                </div>
                            </> :
                            (allPost.length === 0) ?
                                <h1 style={{
                                    fontFamily: "Times New Roman",
                                    fontWeight: "700"
                                }}>No posts available here</h1> :
                                allPost.map((elem, index, arr) => {
                                    return <Posts delete={1} username={elem.username} title={elem.title} desc={elem.desc}></Posts>
                                })}
                </>
            </div>
        </>
    )
}
export default Profile;
