import React from "react"
import ReactDOM from "react-dom"
import Posts from "./Posts"
import Story from "./Story"

import imgSrc from "../Resources/Akash Image.jpg"

import imgSrc2 from "../Resources/computer image.jpg"
import imgSrc3 from "../Resources/A letter logo.jpg"

const HomePage = () => {

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
