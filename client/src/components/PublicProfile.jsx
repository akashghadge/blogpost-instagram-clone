import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useHistory, useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Button from "@material-ui/core/Button/Button"
import Posts from "./Posts"
import axios from "axios"
import ReactLoading from "react-loading"

const Profile = () => {
    let [loading, setLoading] = useState(true);
    let { username } = useParams();
    let [fname, setFname] = useState("");
    let [lname, setLname] = useState("");
    let [email, setEmail] = useState("");


    axios.get(`/api/public/${username}`).then((data) => {
        setFname(data.data[0].fname);
        setLname(data.data[0].lname);
        setEmail(data.data[0].email);
    }).catch((err) => {
        console.log(err);
    })


    let [currentUser, setCurrentUsername] = useState("");
    let token = localStorage.getItem("token");
    axios.post("/api/profile", {
        token: token
    }).then((data) => {
        setCurrentUsername(data.data.username);
        // console.log(currentUser);
    }).catch((err) => {
        console.log(err);
    })


    let [allPost, setAllPost] = useState([{}]);
    useEffect(() => {
        axios.post("/api/post/", {
            username: username
        }).then((data) => {
            setAllPost(data.data)
            setLoading(false);
            // console.log(allPost);
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

    let [followButtonValue, setFollowButtonValue] = useState(true);

    axios.post("/api/follow/following/is", {
        username: username,
        currentUser: currentUser
    }).then((data) => {
        // console.log(data);
        setFollowButtonValue(data.data)
    }).catch((err) => {
        console.log(err);
    })

    function followButtonClick(e) {
        setFollowButtonValue(1);
        axios.post("/api/follow/following/add", {
            username: currentUser,
            fUsername: username
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        axios.post("/api/follow/followers/add", {
            username: username,
            fUsername: currentUser
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function unfollowButtonClick(e) {
        setFollowButtonValue(0);
        axios.post("/api/follow/following/delete", {
            username: currentUser,
            fUsername: username
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        axios.post("/api/follow/followers/delete", {
            username: username,
            fUsername: currentUser
        }).then((data) => {
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }




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
            <div style={{ textAlign: "center" }}>
                {
                    currentUser != username ?
                        (!followButtonValue) ? (<Button className="followButton" onClick={followButtonClick}>Follow</Button>) : (<Button className="unfollowButton" onClick={unfollowButtonClick}>UnFollow</Button>) :
                        null
                }
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
                                    return <Posts username={elem.username} title={elem.title} desc={elem.desc}></Posts>
                                })}
                </>
            </div>
        </>
    )
}
export default Profile;
