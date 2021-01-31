const { Router } = require("express");
const router = Router();

let User = require("../models/User.model");

const bcrypt = require("bcrypt");


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
            newUser.save().then((data) => {
                console.log(data);
                res.status(200).json(data);
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
            res.status(200).json({
                message: "valid password"
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