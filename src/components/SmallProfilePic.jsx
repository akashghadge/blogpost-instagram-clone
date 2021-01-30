import React, { useState } from "react"
import ReactDOM from "react-dom"
const SmallProfilePic = (props) => {
    let accImgSrc = props.imgSrc;
    return (
        <>
            <img src={accImgSrc} alt="story" className="storyIcon"></img>
        </>
    )
}
export default SmallProfilePic;
