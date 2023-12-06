const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

// Helper function to create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Authentication Functions
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.signup(email, password, username);
    const token = createToken(user._id);
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Password Management Functions
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `${resetUrl}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      res.status(200).json({ message: "Password reset link sent to email." });
    }
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ error: "Password reset token is invalid or has expired." });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({ message: "Password has been updated." });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id); 

  if (!await bcrypt.compare(currentPassword, user.password)) {
    return res.status(400).json({ error: "Current password is incorrect." });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.status(200).json({ message: "Password successfully updated." });
};

// User Information Functions
const getUsername = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The user does not exist" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    res.status(200).json(user.username);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The user does not exist" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    res.status(200).json(user.isAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIsBanned = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The user does not exist" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    res.status(200).json(user.isBanned);
  } catch (error) {
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

const banUser = async (req, res) => {
  const { id } = req.params;
  if (req.body.admin !== true) {
    return res.status(403).json({ error: "Unauthorized to delete this user" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The user does not exist" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    user.isBanned = true;
    await user.save();
    res.status(200).json("user successfully banned");
  } catch (error) {
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


// Export Functions
module.exports = {
  loginUser,
  signupUser,
  getUserEmailById,
  getUsername,
  getUserAdmin,
  getIsBanned,
  banUser,
  forgotPassword,
  resetPassword,
  changePassword,
  getFavoriteAds,
  getIsFavorite,
  addFavoriteAd,
  removeFavoriteAd
};