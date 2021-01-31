const express = require("express");
const app = express();
// dynamic port allocation
const port = process.env.PORT || 5000;
// cross origin error
const cors = require("cors");
require("dotenv").config();

const http = require("http").createServer(app);
// middlewares
app.use(express.json());
app.use(cors());

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

// app.get("/", (req, res) => {
//     res.send("hello")
// })

// routes 
const User = require("./routers/User.route");
app.use("/api/user", User);


http.listen(port, () => {
    const port = http.address().port;
    const address = http.address().address;
    console.log("server is listening at %s and at the %s adress", port, address);
})