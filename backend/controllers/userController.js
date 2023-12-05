//import the user schema
const User = require("../models/userModel");
//use jsonwebtocken package for generating auth tokens
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
  const { email, password,username} = req.body;
  //try to create the user - if theres an error we catch it
  try {
    const user = await User.signup(email, password,username);
    //create a token
    const token = createToken(user._id);
    //no error so send a good response with the token for the user
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    //since theres an error, send a bad response
    res.status(400).json({ error: error.message });
  }
};

// Get a single users name
const getUsername = async (req, res) => {
  // Check if the ID is valid
  const { id } = req.params;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The user does not exist" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(id);
    // If the ad doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    // Return the user
    res.status(200).json(user.username);
  } catch (error) {
    // If an error occurs, return an error status
    res.status(400).json({ error: error.message });
  }
};


const getUserEmailById = async (userId) => {

  try {
    const user = await User.findById(userId).select('email');


    if (!user) throw new Error('User not found');
    return user.email;
  } catch (error) {
    throw error;
  }
};

//export these functions
module.exports = { loginUser, signupUser, getUserEmailById,getUsername};
