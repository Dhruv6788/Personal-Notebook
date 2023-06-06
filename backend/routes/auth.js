const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'DhruvI$Lucky';

// Route: 1 Create a User using: POST "/api/auth/signup". Do not require Auth
router.post('/signup', [
  body("name", "Enter a valid Name").isLength({ min: 3 }),
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Password Must be atleast 5 Characters").isLength({ min: 5 })
], async (req, res) => {
  // If there is error it returns 
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ result: result.array() })
  }
  // Check Weather the user with this username already exists or not 
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ result: "Sorry, user with this email is already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // create new user 
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ Greetings: "Account Created Successfully", AuthenticationToken: authToken });
  } catch (error) {
    console.error(result.message);
    res.status(500).send("Some error occured");
  }
});

// Route: 2 Authenticate the User using the /api/auth/login Usinf the POST REQUESTS
router.post('/login', [
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Password Cannot be blank").exists()
], async (req, res) => {
  // If there is error it returns 
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ result: "Please Login With Correct credintials" });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ result: "Please Login With Correct credintials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({ result: "Please Login With Correct credintials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ Greetings: "Account logged in Successfully", AuthenticationToken: authToken });

  } catch (error) {
    console.error(result.message);
    res.status(500).send("Internal Server occured");
  }
})
module.exports = router

// Route: 3 FETCH THE USERS DETAILS /api/auth/getuser- LOGIN REQUIRED

router.post('/getuser',fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await  User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
})
