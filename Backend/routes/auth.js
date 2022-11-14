//requiring the bcryptjs module
var bcrypt = require('bcryptjs');
//importing the jwt token
var jwt = require("jsonwebtoken")
// importing the express 
const express = require("express")
//importing the express validator
const { body, validationResult } = require('express-validator');
//How to acquire models
const User = require("../models/User")
const router = express.Router();
//Can also create a custom error
router.post('/createuser',[body('email','Enter a valid email').isEmail(),body('name','Enter a valid name').isLength({ min: 3 })
,body('password','Enter a valid password').isLength({ min: 5 })],async (req,res)=>{
    const errors = validationResult(req);
    var JWT_SECRET = "iloveadi";
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //generating the salt and hash
    var salt = await bcrypt.genSalt(10)
    var secPass = await bcrypt.hash(req.body.password,salt);
    //waiting for the data to return
    try{
      var user = await User.findOne({
        email:req.body.email
      })
      if(user){
        return res.status(400).json({error : "Email already exists"});
      }
      user = await User.create({
        name : req.body.name,
        password : secPass,
        email : req.body.email
      });
/*working with JWT Token
*/
      var data = {
        user : user.id
      }
      var jwtData = jwt.sign(data,JWT_SECRET);
      
      
      res.json(jwtData);
    }
   catch(error){
    res.send("Opps! There is some error.")
   }
    
    
})
module.exports = router;   