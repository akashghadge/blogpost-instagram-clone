import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import Posts from "./Posts"

import imgSrc from "../Resources/Akash Image.jpg"

import imgSrc2 from "../Resources/computer image.jpg"
import imgSrc3 from "../Resources/A letter logo.jpg"

import axios from "axios"
import { useHistory } from "react-router-dom"
const HomePage = () => {
    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("/api/me", {
        token: token
    }).then((data) => {
        // console.log(data);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })

    let [allPost, setAllPost] = useState([{}]);
    useEffect(() => {
        axios.post("/api/post/all").then((data) => {
            setAllPost(data.data)
            // console.log(allPost);
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <>
            <hr></hr>
            {
                (allPost.length == 0) ?
                    <h1>No posts available here</h1> : allPost.map((elem, index, arr) => {
                        return <Posts username={elem.username} title={elem.title} desc={elem.desc}></Posts>
                    })}
        </>
    )
}
export default HomePage;