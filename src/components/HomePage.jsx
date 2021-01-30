import React from "react"
import ReactDOM from "react-dom"
import Posts from "./Posts"
import Story from "./Story"

import imgSrc from "../Resources/Akash Image.jpg"
const HomePage = () => {

    return (
        <>
            <Story></Story>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
            <Posts smallSrc={imgSrc} mainImgSrc={imgSrc} username={"akash"} likeCount={1} commentCount={2}></Posts>
        </>
    )
}
export default HomePage;
