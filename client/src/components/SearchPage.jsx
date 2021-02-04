import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import ReactLoading from "react-loading"
import axios from "axios"
import Search from "@material-ui/icons/Search"

import Button from "@material-ui/core/Button/Button"
import { useHistory } from "react-router-dom"
const SearchPage = () => {
    let [loading, setLoading] = useState(true);
    let [username, setUser] = useState("");


    // authintication here
    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("/api/me", {
        token: token
    }).then((data) => {
        // console.log(data);
        let user = data.data.username;
        setUser(user);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })

    let [inputValue, setInputValue] = useState({
        title: "",
    })
    function inputChange(event) {
        let { name, value } = event.target;
        setInputValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    let [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        axios.post("/api/user/all", {

        }).then((data) => {
            // console.log(data);
            setAllUsers(data.data);
            setLoading(false);
        }).catch((err) => {
            // console.log(err);
        })
    }, [inputValue.title])


    function submitData() {
        let temp = allUsers;
        let temp1 = [];
        setAllUsers([]);
        temp.forEach((elem, index, arr) => {
            // console.log(elem.username);
            // console.log(inputValue.title);
            if (elem.username == inputValue.title) {
                temp1.push({ username: elem.username });
            }
        })
        setAllUsers(temp1);
        // console.log(allUsers);
    }
    function clickedUser(e) {
        let pUsername = e.target.id;
        // console.log(pUsername);
        history.push(`/public/${pUsername}`);
    }
    return (
        <>
            <div className="position-relative text-center" >
                <h1 className="display-4 font-weight-normal" id="headingCreatePost">Search Users</h1>
                <input type="text" placeholder="search a username" id="titleInput" name="title" className="form-control" onChange={inputChange} value={inputValue.title}></input>
                <Button id="addButton" className="my-3" onClick={submitData}><Search></Search></Button>
            </div>
            <ul style={{
                textAlign: "center"
            }} className="serachList">
                {
                    loading ?
                        <>
                            <div style={{ position: "relative", textAlign: "center", display: "block", left: "50%", top: "40%" }}>
                                <ReactLoading type={"spin"} color={"black"} height={"5%"} width={"5%"}></ReactLoading>
                            </div>
                        </> :
                        allUsers.length != 0 ?
                            allUsers.map((elem, index) => {
                                return (
                                    <>
                                        <li className="listElement" onClick={clickedUser} name={elem.username} id={elem.username} style={{ display: "inline" }}>{elem.username}</li>
                                        <br></br>
                                    </>
                                )
                            }) :
                            <h3>No users available</h3>
                }
            </ul>
        </>
    )
}
export default SearchPage;
