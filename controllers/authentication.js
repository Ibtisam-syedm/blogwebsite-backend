const userModel = require("../models/User")
const jwt = require("jsonwebtoken");
// handle all errors
function handleErrors(err) {
    // console.log(err.message,err.code);
    let errorObject = { email: "", password: "" };
    // validation for requirements of email and password
    if (err.message.includes("user validation failed")) {
        // console.log(err);
        Object.values(err.errors).forEach(error => {
            // console.log(error.properties);
            errorObject[error.properties.path] = error.properties.message;
        })
        return errorObject;
    }
    // checking duplicates email addresses
    if (err.code === 11000) {
        errorObject.email = "Email already registered";
        return errorObject;
    }
    //checking incorrect email whn login
    if (err.message.includes("incorrect email")) {
        // console.log(err.message);
        errorObject["email"] = err.message
        return errorObject;
    }
    //checking incorrect password whn login
    if (err.message.includes("incorrect password")) {
        errorObject["password"] = err.message
        return errorObject;
    }
}
function createToken(data) {
    // payload
    // secrete string
    // expiration time in seconds
    return jwt.sign({ data }, "my secret", { expiresIn: 24 * 60 * 60 });
}
function get_signup(req, res) {
    res.render("signup");
}
function get_login(req, res) {
    res.render("login");
}
async function post_signup(req, res) {
    try {
        const { email, password } = req.body;
        // console.log(email,password);
        const userDoc = new userModel({ email: email, password: password });
        let token = createToken(userDoc._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        await userDoc.save();
        res.status(201).json({ user: userDoc._id });
    } catch (errors) {
        // console.log(error);
        const error = handleErrors(errors);
        res.status(400).json({ error });
    }
}
async function post_login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password);
        let token = createToken(userDoc._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ user: user._id });
    } catch (errors) {
        const error = handleErrors(errors);
        res.status(400).json({ error });
    }
    // console.log(req.body);
    // res.send("new login");
}

module.exports = {
    get_login,
    get_signup,
    post_login,
    post_signup
}