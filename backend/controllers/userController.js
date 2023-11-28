//import the user schema
const User = require('../models/userModel');

//login user function
const loginUser = async (req,res) => {
    res.json({msg:"login user"})
}



//signup user function
const signupUser = async (req,res) => {
    //get the email and password from req body
    const {email,password} = req.body
    //try to create the user - if theres an error we catch it
    try{
        const user = await User.signup(email,password)
        //no error so send a good response
        res.status(200).json({email,user})
    } catch (error){
        //since theres an error, send a bad response
        res.status(400).json({error: error.message})
    }   
}

module.exports = {loginUser, signupUser}