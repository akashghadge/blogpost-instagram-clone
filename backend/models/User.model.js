const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;


