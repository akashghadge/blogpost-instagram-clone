import React, { useState } from "react"
import ReactDOM from "react-dom"
import SmallProfilePic from "./SmallProfilePic";


import ThumbUp from "@material-ui/icons/ThumbUp"
import Comment from "@material-ui/icons/Comment"
import { Share } from "@material-ui/icons";
const Posts = (props) => {
    return (
        <>
            <div className="position-relative overflow-hidden my-3 postMain px-2 py-3">
                <SmallProfilePic imgSrc={props.smallSrc}></SmallProfilePic><p className="uploaderName">{props.username}</p>
                <hr></hr>
                <div className="col-md-8 p-lg-5 mx-auto my-3">
                    <img src={props.mainImgSrc} className="postImg"></img>
                </div>
                <hr></hr>
                <div className="overflow-hidden my-2 mx-2">
                    <ThumbUp className="marginPost"></ThumbUp>
                    <p className="marginPost">{props.likeCount}</p>
                    <Comment className="marginPost"></Comment>
                    <p className="marginPost">{props.commentCount}</p>
                    <Share className="marginPost"></Share>
                </div>
            </div>
        </>
    )
}
export default Posts;
