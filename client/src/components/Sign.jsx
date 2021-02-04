import React, { useState } from "react"
import ReactDOM from "react-dom"


//components
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const Sign = () => {
    let [signOpt, setSignOpt] = useState(0);

    function clicked(event) {
        setSignOpt(Number(event.target.value))
    }
    return (
        <>
            <div className="btn-group" style={{ display: "block", textAlign: "center" }} role="group" aria-label="Basic example">
                <button type="button" className="btn  signInHeding" value="1" onClick={clicked} style={{ outline: "none", outlineColor: "purple" }}>Sign In</button>
                <button type="button" className="btn signInHeding" value="0" onClick={clicked}>Sign Up</button>
            </div>
            {signOpt ? <SignIn></SignIn> : <SignUp></SignUp>}
        </>
    )
}
export default Sign;
