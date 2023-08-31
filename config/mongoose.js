const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://bendkolinanda12:Nanda123@cluster0.sj5feyg.mongodb.net/api-polling?retryWrites=true&w=majority");



const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connection to Mongodb"));


db.once("open", function () {
    console.log("Successfully connected to Database :: MongoDB");


});

module.exports = db;

