const express = require("express");
const app = express();
const {PORT, DB_URL_LOCAL} = require("./utils/config");
const connection = require("./utils/db");
const blogModel = require("./models/blog")

//Database Connection
connection(DB_URL_LOCAL);


app.get("/",async (req,res)=>{
    const newBlog = new blogModel({title:"Blog db testing",content:"No need of content",author:"Syed Muhammad Ibtisam"});
    await newBlog.save();
    res.send("running");
});

app.listen(PORT,()=>{
    console.log("Server is up and running");
});
