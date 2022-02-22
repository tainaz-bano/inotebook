const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
const fetchuser =require('../middleware/fetchUser')
const JWT_Tok= 'Ccar$321'

// ---------------------------------------------------------------------------------------------

//ROUTE 1: Create user using: POST /api/auth/createuser. No login required, no authentication
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //If error send bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check wheather user exists
    try {
    let user= await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({error: 'User already exists'})
    }
    //Add salt for authentication
    const salt= await bcrypt.genSalt(10)
    secPass=await bcrypt.hash(req.body.password,salt)
    // Create a user
     user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      // JWT token generation
      const data={
        user:{
          id: user.id
        }
      }
      const auth_token=  jwt.sign(data, JWT_Tok)
      // res.json(user)
      res.json({auth_token})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured")
    }
  }
  
);

// ---------------------------------------------------------------------------------------------

// ROUTE 2: Authentication of a user:  POST /api/auth/login


router.post(
  "/login",
  [
    body("email", 'Enter Valid Email').isEmail(),
    body("password", 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    //If error send bad request and error message
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      success=false
    }

      const {email, password}=req.body;
      try {
        let user= await User.findOne({email})
        if(!user){
          return res.status(400).json({error: "No user found"})
          success=false
        }
      const passwordCompare= await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false
        return res.status(400).json({success, error: "Please try with correct credentials"})
      }

      const data={
        user:{
          id: user.id
        }
      }
      const auth_token=  jwt.sign(data, JWT_Tok)
      success=true
      res.json({success,auth_token})

      } catch (error) {
        console.log(error.message);
      res.status(500).send("Internal Server Error")
      }
  });

// ---------------------------------------------------------------------------------------------

  // ROUTE 3: Get logged in user detail:  POST /api/auth/getuser . Login required
  router.post(
    "/getuser",fetchuser,
    async (req, res) => {
      //If error send bad request and error message
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
  try {
    //Validate auth token and get the user id and show user data
    userid=req.user.id
   const user = await User.findById(userid).select("-password") 
   res.send(user)

  } catch (error) {
    console.log(error.message);
  res.status(500).send("Internal Server Error")
  }
})





module.exports = router;
