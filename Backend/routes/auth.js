//requiring the bcryptjs module
var bcrypt = require("bcryptjs");
//importing the jwt token
var jwt = require("jsonwebtoken");
// importing the express
const express = require("express");
//importing the express validator
const { body, validationResult } = require("express-validator");
//How to acquire models
const User = require("../models/User");
const router = express.Router();
var JWT_SECRET = "iloveadi";
//importing the fetchUser
var fetchUser = require("../middleware/fetchUser");
var success = false;
//Can also create a custom error
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //generating the salt and hash
    var salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);
    //waiting for the data to return
    try {
      var user = await User.findOne({  
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ success : success,error: "Email already exists" });
      }
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      /*working with JWT Token
       */
      var data = {
        user: user.id,
      };
      var jwtData = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success : success,"auth-token":jwtData});
    } catch (error) {
      res.send("Opps! There is some error.");
    }
  }
);

//login router

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //validating the email and password on the basis of above parameters
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //finding the user with that email
      var user = await User.findOne({ email: email });
      if (!user) {
        success = false;
        return res.status(400).json({success:success,error : "Login with correct Credentials."});
      }
      //comparing the password entered and password of the user.
      const passCompare = await bcrypt.compare(password,user.password)
      if(!passCompare){
        success = false;
        return res.status(400).json({success:success,error : "Login with correct Credentials."});
      }
      //sending the auth token
      var data = {
        user: user.id,
      };
      var jwtData = jwt.sign(data, JWT_SECRET);
      success = true;

     return  res.json({success : success,authtoken : jwtData});

    } catch (error) {
      // catching and printing the error in login
      res.json({error : "Opps! There is some error : " + (error.message) });
    }
  }
);

//getuser router : to get the details of the user
router.post("/getuser",fetchUser, async (req,res)=>{
  try{
    var userId = req.user;
  const userData = await User.findById(userId).select("-password");
  res.send(userData);
  }
  catch(error){
    res.status(500).send("Some error occured");
  }
  


});
module.exports = router;
