//Use Mongoose for creating the Model Schema
const mongoose = require('mongoose');
//Use bcrypt for hashing the passwords to store them in the database
const bcrypt = require('bcrypt')


//Create Schema for user
const Schema = mongoose.Schema

//user has email and password
//email is unique since cant have multiple users with same email
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

//static method to aid with signing up a user instead of doing everything in the controller
userSchema.statics.signup = async function (email,password) {
    //if theres no email or password throw an error
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    //check if email already exists in database, if so then send back error response
    const emailExists = await this.findOne({email})
    if (emailExists){
        throw Error('Email already in use')
    }

    //hash the password - salts are added to end of password ex password123agkeaghaeh
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    //create the user in the database and return it 
    const user = await this.create({email,password:hash})
    return user
}

//Export the Schema
module.exports = mongoose.model('User', userSchema);