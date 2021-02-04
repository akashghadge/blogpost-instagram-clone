import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom"
import axios from "axios"

import Button from "@material-ui/core/Button/Button"
import Add from "@material-ui/icons/Add"

const CreatePost = () => {
    let [username, setUser] = useState("");


    // authintication here
    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/me", {
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
        content: ""
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
    function submitData() {
        if (inputValue.title.length >= 3 && inputValue.content.length >= 3) {
            axios.post("http://localhost:5000/api/post/create", {
                username: username,
                title: inputValue.title,
                desc: inputValue.content
            }).then((data) => {
                // console.log(data);
                setInputValue({
                    title: "",
                    content: ""
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }



    return (
        <>
            <div className="position-relative text-center" >
                <h1 className="display-4 font-weight-normal" id="headingCreatePost">Create Post</h1>
                <input type="text" placeholder="type a title" id="titleInput" name="title" className="form-control" onChange={inputChange} value={inputValue.title}></input>
                <br></br>
                <textarea placeholder="type a post" id="textInput" className="form-control" name="content" onChange={inputChange} value={inputValue.content}></textarea>
                <br></br>
                <Button id="addButton" onClick={submitData}><Add></Add></Button>
            </div>
        </>
    )
}
export default CreatePost;
