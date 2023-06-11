const userModel = require("../models/User")

// handle all errors
function handleErrors(err){
    console.log(err.message,err.code);
    let errorObject = {email:"",password:""};
    // validation for requirements of email and password
    if (err.message.includes("user validation failed")){
        // console.log(err);
        Object.values(err.errors).forEach(error => {
            // console.log(error.properties);
            errorObject[error.properties.path] = error.properties.message;
        })
        return errorObject;
    }
    // checking duplicates email addresses
    if(err.code === 11000){
        errorObject.email = "Email already registered";
        return errorObject;
    }
    // console.log(errorObject);
    
}

function get_signup(req,res){
    res.render("signup");
}
function get_login(req,res){
    res.render("login");
}
async function post_signup(req,res){
    try {
        const {email,password} = req.body;
        // console.log(email,password);
        const userDoc = new userModel ({email:email,password:password});
        await userDoc.save();
        res.status(201).json(userDoc);
    } catch (errors) {
        // console.log(error);
        const error = handleErrors(errors);
        res.status(400).json({error});
    }
}
function post_login(req,res){
    console.log(req.body);
    res.send("new login");
}

module.exports = {
    get_login,
    get_signup,
    post_login,
    post_signup
}