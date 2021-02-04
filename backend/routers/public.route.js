const { Router } = require("express");
const User = require("../models/User.model");
const router = Router();

router.get("/:username", async (req, res,) => {
    const username = req.params.username;
    let data = await User.find({ username: username }).select("-password");
    console.log(data);
    res.json(data);
});
module.exports = router;