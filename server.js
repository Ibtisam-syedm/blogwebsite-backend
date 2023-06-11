const express = require("express");
const app = express();
const {PORT, DB_URL_LOCAL_AUTH} = require("./utils/config");
const connection = require("./utils/db");
const authenticaion = require("./routes/authentication")
// const blogModel = require("./models/blog")

//Database Connection
connection(DB_URL_LOCAL_AUTH);

//middlewares
app.use(express.static("public"));
// converts json object into javasricpt object
app.use(express.json());
app.use("/authentication",authenticaion);
app.set("view engine","ejs");

//routes
app.get("/",(req,res)=>{
   res.render("home"); 
});
app.get("/smoothies",(req,res)=>{
    res.render("smoothies"); 
 });
// app.get("/",async (req,res)=>{
//     const newBlog = new blogModel({title:"Blog db testing",content:"No need of content",author:"Syed Muhammad Ibtisam"});
//     await newBlog.save();
//     res.send("running");
// });

app.listen(PORT,()=>{
    console.log("Server is up and running");
});
