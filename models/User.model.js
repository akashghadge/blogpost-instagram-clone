const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema({
    username: {
        type: String
    },
    title: {
        type: String,
        unique: true
    },
    desc: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

const follower = new Schema({
    fusername: {
        type: String,
        unique: true
    }
})

const following = new Schema({
    fusername: {
        type: String,
        unique: true
    }
})
const userSchema = new Schema({
    fname: {
        type: String,
        minlength: 3,
        required: true
    },
    lname: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    post: [Post],
    follower: [follower],
    following: [following]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;


