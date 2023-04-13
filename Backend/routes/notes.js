const express = require("express");
const app = express();
const Notes = require("../models/Notes.js");
const fetchUser = require("../middleware/fetchUser.js");
app.use(express.json());
var cors = require('cors')


app.use(cors())
const router = express.Router();
//express validator for the validation of the notes
const { body, validationResult } = require("express-validator");

//to get all the notes 
router.get("/fetchallnotes",fetchUser,async (req,res)=>{
  const notes = await Notes.find({user : req.user});
  res.json(notes);
})
//to save the notes on the database
router.post("/addnotes",fetchUser, [
    body("title", "Enter a valid title").isLength({min : 3}),
    
    body("description", "Enter a valid description").isLength({ min: 5 })
  ],async (req,res)=>{
 
  const errors = validationResult(req);
  if(!errors.isEmpty()){
   return res.status(401).send({error:"Enter a valid entry."});

  }
  try{
    
    var notes = await Notes.create({
        title: req.body.title,
        description : req.body.description,
        tag : req.body.tag,
        user : req.user
      });
      
     const savedNote = await notes.save();
     res.json(savedNote);
  }
  catch(error){
    return res.status(401).send({error : "There is some error."});
  }
 
})
//route to update the note
router.put("/updatenotes/:id",fetchUser,async (req,res)=>{
  
    const {title , description, tag} = req.body;
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }
    var foundNote = await Notes.findById(req.params.id);
    if(!foundNote){
        return res.status(401).send("Notes not found");
    }
    if(foundNote.user.toString() !== req.user){
        return res.status(401).send("Not Allowed");
    }
 foundNote = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
 res.json(foundNote);
  })
  //router to delete an existing node
  router.delete("/deletenotes/:id",fetchUser,async (req,res)=>{
    try{
    var foundNote = await Notes.findById(req.params.id);
    if(!foundNote){
        return res.status(401).send("Notes not found");
    }
    if(foundNote.user.toString() !== req.user){
        return res.status(401).send("Not Allowed");
    }
 foundNote = await Notes.findByIdAndDelete(req.params.id);
 res.json({"Success":"Note has been deleted"});
  }
  catch(error){
    res.status(401).send({error : error.message});
  }
  })
module.exports = router;