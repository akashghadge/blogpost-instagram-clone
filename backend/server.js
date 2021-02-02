const express = require("express");
const app = express();
const http = require("http").createServer(app);

// dynamic port allocation
const port = process.env.PORT || 5000;

// cross origin error
const cors = require("cors");
require("dotenv").config();

// requiring cookie-parser and the jwt 
const cookieParser = require("cookie-parser");



// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// adding mongoDB
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
mongoose.connect(uri || "mongodb://localhost/instagram-clone", {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
}).then((data) => {
    console.log("DB is connected..");
}).catch((err) => {
    console.log(err);
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Database connected sucessfully");
})



// routes 
const User = require("./routers/User.route");
const verify = require("./middleware/verify");
const auth = require("./routers/auth.route");
const profile = require("./routers/profile.route")
const Post = require("./routers/post.route");
app.use("/api/user", User);
app.use("/api/me", verify, auth);
app.use("/api/profile", verify, profile)
app.use("/api/post", Post);
http.listen(port, () => {
    const port = http.address().port;
    const address = http.address().address;
    console.log("server is listening at %s and at the %s adress", port, address);
})