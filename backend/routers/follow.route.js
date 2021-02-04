const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
router.post("/followers/me", async (req, res,) => {
    const username = req.body.username;
    try {
        let data = await User.find({ username: username }).select("follower -_id");
        res.status(200).json(data[0].follower)
    }
    catch {
        res.status(500).json("server error")
    }
});
router.post("/followers/me/count", async (req, res,) => {
    const username = req.body.username;
    try {
        let data = await User.find({ username: username }).select("follower -_id");
        res.status(200).json(data[0].follower.length)
    }
    catch {
        res.status(500).json("server error")
    }
});

router.post("/followers/add", async (req, res) => {
    const username = req.body.username;
    const followerUsername = req.body.fUsername;
    const data = await User.updateOne({ username: username }, {
        $push: {
            follower: {
                fusername: followerUsername
            }
        }
    }
    ).then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/followers/delete", async (req, res) => {
    const username = req.body.username;
    const followerUsername = req.body.fUsername;
    const data = await User.updateOne({ username: username }, {
        $pull: {
            follower: {
                fusername: followerUsername
            }
        }
    }
    ).then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
    });
})


// following routes

router.post("/following/me", async (req, res,) => {
    const username = req.body.username;
    try {
        let data = await User.find({ username: username }).select("following -_id");
        res.status(200).json(data[0].following)
    }
    catch {
        res.status(500).json("server error")
    }
});
router.post("/following/me/count", async (req, res,) => {
    const username = req.body.username;
    try {
        let data = await User.find({ username: username }).select("following -_id");
        res.status(200).json(data[0].following.length)
    }
    catch {
        res.status(500).json("server error")
    }
});

router.post("/following/add", async (req, res) => {
    const username = req.body.username;
    const followerUsername = req.body.fUsername;
    const data = await User.updateOne({ username: username }, {
        $push: {
            following: {
                fusername: followerUsername
            }
        }
    }
    ).then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
    });
});

router.post("/following/delete", async (req, res) => {
    const username = req.body.username;
    const followerUsername = req.body.fUsername;
    const data = await User.updateOne({ username: username }, {
        $pull: {
            following: {
                fusername: followerUsername
            }
        }
    }
    ).then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
    });
})


// is following return boolean value 
router.post("/following/is", async (req, res) => {
    const username = req.body.currentUser;
    const Fusername = req.body.username;

    let data = await User.find({ username: username }).select("following -_id")
        .then((data) => {
            // console.log(data[0].following);
            let temp = data[0].following;
            let flag = 0;
            temp.forEach((elem, index, arr) => {
                if (elem.fusername == Fusername) {
                    flag = 1
                }
            })
            res.json(flag)
        }).catch((err) => {
            console.log(err);
            res.json(err)
        })

})
module.exports = router;