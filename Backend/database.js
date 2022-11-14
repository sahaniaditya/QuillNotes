//Connection link : mongodb://localhost:27017
const mongoose = require("mongoose");
const mongoURL =  "mongodb://localhost:27017/notebook";
const connectToMongo = () =>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected to MongoDB.");
    })
}
module.exports = connectToMongo;