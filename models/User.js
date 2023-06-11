const mongoose = require("mongoose");
const {isEmail} = require("validator");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        validate:[isEmail,"Please enter an valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"Password should be greater than 5 characters"]
    },
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;