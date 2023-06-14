const express = require("express");
const app = express();
const {PORT, DB_URL_LOCAL_AUTH} = require("./utils/config");
const connection = require("./utils/db");
const authenticaion = require("./routes/authentication")
const cookieParser = require("cookie-parser");

// const blogModel = require("./models/blog")

//Database Connection
connection(DB_URL_LOCAL_AUTH);

//middlewares
app.use(express.static("public"));
// converts json object into javasricpt object
app.use(express.json());
// cookie parser
app.use(cookieParser());

app.use("/authentication",authenticaion);
app.set("view engine","ejs");

//routes
app.get("/",(req,res)=>{
   res.render("home"); 
});
app.get("/smoothies",(req,res)=>{
    res.render("smoothies"); 
 });

app.use("/set-cookie",(req,res)=>{
    res.setHeader("Set-Cookie","newUser=true");
    res.send("u got it bro");
});
// app.get("/",async (req,res)=>{
//     const newBlog = new blogModel({title:"Blog db testing",content:"No need of content",author:"Syed Muhammad Ibtisam"});
//     await newBlog.save();
//     res.send("running");
// });

app.listen(PORT,()=>{
    console.log("Server is up and running");
});
