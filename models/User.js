const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
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

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    // console.log(doc);
    next();
})
// userSchema.post("save",function(doc,next){
//     console.log("User created", doc);
//     next();
// })

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;