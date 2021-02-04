import React, { useState } from "react"
import ReactDOM from "react-dom"
// stories are come from api

import imgSrc from "../Resources/Akash Image.jpg"
import SmallProfilePic from "./SmallProfilePic"


const Story = () => {
    return (
        <>
            <div className="storyDiv">
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>
                <SmallProfilePic imgSrc={imgSrc}></SmallProfilePic>

            </div>
        </>
    )
}
export default Story;
