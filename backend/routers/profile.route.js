const { Router } = require("express");
const router = Router();
const User = require("../models/User.model");
router.post("/", async (req, res,) => {
    // res.status(200).json(res.locals.currentuser)

    let username = res.locals.currentuser.username;
    let data = await User.findOne({ username: username });
    res.status(200).json(data);

});
module.exports = router;