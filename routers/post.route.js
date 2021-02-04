const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
router.post("/all", async (req, res) => {
    let allPost = []
    let data = await (await User.find({}).select("post -_id")).concat().forEach((elem, index) => {
        allPost = allPost.concat(elem.post);
    });
    // console.log(allPost);
    res.status(200).json(allPost);
})
router.post("/", async (req, res,) => {
    // res.status(200).json(res.locals.currentuser)
    const username = req.body.username;
    let data = await User.findOne({ username: username });
    if (data != null) {
        console.log(data.post);
        res.status(200).json(data.post);
    }

});

router.post("/create", async (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const desc = req.body.desc;

    let obj = {
        username: username,
        title: title,
        desc: desc
    }
    let data = await User.updateOne(
        { username: username },
        {
            $push: {
                post: {
                    username: username,
                    title: title,
                    desc: desc
                }
            }
        }
    ).then((updatedData) => {
        console.log(updatedData);
        res.json(updatedData)
    }).catch((err) => {
        console.log(err);
        res.status(404).json(err)
    });
    // console.log(data);
})

router.post("/delete", async (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const desc = req.body.desc;
    User.updateOne({ username: username }, { $pull: { post: { username: username, title: title, desc: desc } } }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json(err);
    })
})

router.post("/update", async (req, res) => {
    const username = req.body.username;
    const title = req.body.title;
    const updateDesc = req.body.updateDesc;
    User.updateOne(
        { username: username, "post.title": title },
        {
            $set: { "post.$.desc": updateDesc }
        }
    ).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json(err);
    })


})
module.exports = router;