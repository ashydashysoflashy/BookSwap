//import the user schema
const User = require("../models/userModel");
//use jsonwebtocken package for generating auth tokens
const jwt = require("jsonwebtoken");

//function to create a token for logging in and signing up
//takes in the _id from a mongodb user which will be part of the payload of the token
//takes secret which is random string from env variables
//expires in 3 days
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user function
const loginUser = async (req, res) => {
  //get the email and password from req body
  const { email, password } = req.body;
  //try to login - if theres an error we catch it
  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    //no error so send a good response with the token for the user
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    //since theres an error, send a bad response
    res.status(400).json({ error: error.message });
  }
};

//signup user function
const signupUser = async (req, res) => {
  //get the email and password from req body
  const { email, password } = req.body;
  //try to create the user - if theres an error we catch it
  try {
    const user = await User.signup(email, password);
    //create a token
    const token = createToken(user._id);
    //no error so send a good response with the token for the user
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    //since theres an error, send a bad response
    res.status(400).json({ error: error.message });
  }
};

//export these functions
module.exports = { loginUser, signupUser };
