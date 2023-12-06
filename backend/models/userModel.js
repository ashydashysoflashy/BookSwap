//Use Mongoose for creating the Model Schema
const mongoose = require("mongoose");
//Use bcrypt for hashing the passwords to store them in the database
const bcrypt = require("bcrypt");

//Create Schema for user
const Schema = mongoose.Schema;

//user has email and password
//email is unique since cant have multiple users with same email
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin:{
    type: Boolean,
  },
  isBanned:{
    type:Boolean,
  },
  ad_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  favorite_ad_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
    },
  ],
});

//static method to aid with signing up a user instead of doing everything in the controller
userSchema.statics.signup = async function (email,password,username) {
  //if theres no email or password throw an error
  if (!email) {
    throw Error("email must be filled");
  }

  if (!password ) {
    throw Error("password must be filled");
  }

  if (!username) {
    throw Error("username must be filled");
  }

  //check if email already exists in database, if so then send back error response
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  //check if username already exists in database, if so then send back error response
  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username must be unique",usernameExists);
  }

  //hash the password - salts are added to end of password ex password123agkeaghaeh
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create the user in the database and return it
  const user = await this.create({ email, password: hash, username,isAdmin: false,isBanned: false});
  return user;
};

//static method to aid with logging in a user
userSchema.statics.login = async function (email, password) {
  //if theres no email or password throw an error
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //find the user of the given email
  const user = await this.findOne({ email });

  //if banned return
  if (user.isBanned){
    throw Error("User Is BANNED")
  }

  //if no user found throw an error
  if (!user) {
    throw Error("User not found");
  }

  //compare password they are trying to login with and stored hashed password
  const passwordsMatch = await bcrypt.compare(password, user.password);

  //if the passwords dont match then throw an error
  if (!passwordsMatch) {
    throw Error("Incorrect Password");
  }

  //return the user since login is successful
  return user;
};

//Export the Schema
module.exports = mongoose.model("User", userSchema);
