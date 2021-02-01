const { Router } = require("express");
const router = Router();

let User = require("../models/User.model");



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/add", (req, res) => {
    // geting data from request
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // finding for exiting user if not add it
    User.find({ username: username })
        .then(async (data) => {
            console.log(data);
            if (data.length != 0) {
                console.log("user already exist");
                res.status(404).json({
                    "message": "user already exists"
                })
            }
            let newUser = new User({
                fname, lname, email, username, password
            });
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            // making a new access token for the user for sign in
            let payload = {
                username: username
            }

            //create the access token with the shorter lifespan
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 900
            })

            newUser.save().then((data) => {
                res.status(200).json({
                    "jwt": accessToken
                })
            }).catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
})


router.post("/in", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {

            /**
             *issuesing the token
             */
            let payload = {
                username: username
            }

            //create the access token with the shorter lifespan
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 });

            // res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
            // res.send();
            // console.log(accessToken);
            res.status(200).json({
                "jwt": accessToken
            })
        }
        else {
            res.status(400).json({ err: "invalid password" });
        }
    } else {
        res.status(401).json({ err: "user does not exists" })
    }
})

module.exports = router;