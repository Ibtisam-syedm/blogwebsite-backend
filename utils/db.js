const mongoose = require("mongoose");

// connection of database
async function connection(URL){
    await mongoose.connect(URL);
    console.log("database connected");
}
module.exports = connection;