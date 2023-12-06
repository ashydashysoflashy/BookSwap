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
  const { email, password, username } = req.body;
  //try to create the user - if theres an error we catch it
  try {
    const user = await User.signup(email, password, username);
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

// Get a single users name
const getUserAdmin = async (req, res) => {
  // Check if the ID is valid
  const { id } = req.params;
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
    res.status(200).json(user.isAdmin);
  } catch (error) {
    // If an error occurs, return an error status
    res.status(400).json({ error: error.message });
  }
};

// Check if use is banned or not
const getIsBanned = async (req, res) => {
  // Check if the ID is valid
  const { id } = req.params;
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
    res.status(200).json(user.isBanned);
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

// Get a single users name
const banUser = async (req, res) => {
  // Check if the ID is valid
  const { id } = req.params;

  // Check if the logged-in user is the not the owner of the ad and not an admin
  if (req.body.admin !== true) {
    return res.status(403).json({ error: "Unauthorized to delete this user" });
  }
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
    // Set isBanned to true and save the user
    user.isBanned = true;
    await user.save();
    res.status(200).json("user succesfully banned");
  } catch (error) {
    // If an error occurs, return an error status
    res.status(400).json({ error: error.message });
  }
};

const addFavoriteAd = async (req, res) => {
  const { user_id, ad_id } = req.body;

  try {
    const user = await User.findById(user_id);
    // Check if the ad is already in favorites
    if (user.favorite_ad_ids.includes(ad_id)) {
      return res.status(400).json({ message: "Ad already in favorites" });
    }
    // Add ad to favorites
    user.favorite_ad_ids.push(ad_id);
    await user.save();
    res.status(200).json({ message: "Ad added to favorites" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const removeFavoriteAd = async (req, res) => {
  const { user_id, ad_id } = req.body;

  try {
    const user = await User.findByIdAndUpdate(user_id, {
      $pull: { favorite_ad_ids: ad_id }
    }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Ad removed from favorites" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoriteAds = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id).populate({
      path: 'favorite_ad_ids',
      model: 'Ad'
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteAds = user.favorite_ad_ids; // This now contains full ad documents
    res.status(200).json(favoriteAds);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getIsFavorite = async (req, res) => {
  const { user_id, ad_id } = req.params;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isFavorite = user.favorite_ad_ids.includes(ad_id);
    res.status(200).json({ isFavorite });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






//export these functions
module.exports = { loginUser, signupUser, getUserEmailById, getUsername, getUserAdmin, getIsBanned, banUser, getFavoriteAds, getIsFavorite, addFavoriteAd, removeFavoriteAd };
