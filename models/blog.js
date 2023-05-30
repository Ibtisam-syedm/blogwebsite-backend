const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
},
{
    timestamps:true
});

const blogModel = mongoose.model("blog",blogSchema);

module.exports = blogModel;