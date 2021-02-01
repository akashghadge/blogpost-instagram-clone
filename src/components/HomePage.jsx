import React from "react"
import ReactDOM from "react-dom"
import Posts from "./Posts"
import Story from "./Story"

import imgSrc from "../Resources/Akash Image.jpg"

import imgSrc2 from "../Resources/computer image.jpg"
import imgSrc3 from "../Resources/A letter logo.jpg"

import axios from "axios"
import { useHistory } from "react-router-dom"
const HomePage = () => {
    let history = useHistory();
    let token = localStorage.getItem("token");
    axios.post("http://localhost:5000/api/me", {
        token: token
    }).then((data) => {
        // console.log(data);
    }).catch((err) => {
        history.push("/sign");
        console.log(err);
    })

    return (
        <>
            <Story></Story>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc2} mainImgSrc={imgSrc2} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc3} mainImgSrc={imgSrc3} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
        </>
    )
}
export default HomePage;
