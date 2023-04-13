/* Notes Schema to store the notes of the users based on category*/

const mongoose = require("mongoose")
const {Schema}  = mongoose;
const NotesSchema = new Schema({
   user:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
   }, 
   title : {
    type : String,
    required : true
   },
   description : {
    type : String,
    required : true
   },
   tag : {
    type : String,
    required : true
   },
   date : {
    type : Date,
    default : Date.now
   }

})
module.exports = mongoose.model("Notes",NotesSchema)