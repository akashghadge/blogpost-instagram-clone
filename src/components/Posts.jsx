import React, { useState } from "react"
import ReactDOM from "react-dom"
import SmallProfilePic from "./SmallProfilePic";
import { useLocation, useHistory } from "react-router-dom"

import ThumbUp from "@material-ui/icons/ThumbUp"
import Comment from "@material-ui/icons/Comment"
import { Share } from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button"
import axios from "axios"
const Posts = (props) => {
    function deletePost(event) {
        axios.post("http://localhost:5000/api/post/delete", {
            username: props.username,
            title: props.title,
            desc: props.desc
        }).then((data) => {
            // console.log(data);
            window.location.reload(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    let history = useHistory();
    function clickedUser(e) {
        let pUsername = e.target.innerText;
        // console.log(pUsername);
        let final = pUsername.split(" ");
        // console.log(final[1]);
        history.push(`/public/${final[1]}`);
    }

    return (
        <>
            <div className="position-relative overflow-hidden my-3 postMain px-2" >
                <h3 className="titleNamePost my-2">{props.title}</h3>
                <p className="uploaderName" onClick={clickedUser}>- {props.username}</p>
                <hr></hr>
                <div className="px-5 my-3 descPost" style={{ textIndent: "10px" }}>
                    <p>{props.desc}</p>
                </div>
                {/* <hr></hr> */}
                <br></br>
                <br></br>
                <div style={{ textAlign: "center", paddingBottom: "21px" }}>
                    {
                        props.delete ? <Button className="delete" style={{ color: "white", outline: "none", backgroundColor: "red" }} onClick={deletePost}>Delete</Button> : null
                    }
                </div>
                {/* <div className="overflow-hidden my-1 mx-2">
                    <ThumbUp className="marginPost"></ThumbUp>
                    <p className="marginPost">{props.likeCount}</p>
                    <Comment className="marginPost"></Comment>
                    <p className="marginPost">{props.commentCount}</p>
                    <Share className="marginPost"></Share>
                </div> */}
            </div>
        </>
    )
}
export default Posts;
