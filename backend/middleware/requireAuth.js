//get jwt
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => {

    //function to verify if a user is authenticated
    const {authorization } = req.headers

    //if theres no authorization send bad status
    if (!authorization){
        return res.status(401).json({error:"authorization token required"})
    }

    //get the authorization token from the header
    const token = authorization.split(' ')[1]
    console.log(token)

    try{
        //get the id by taking the token and the secret and decrypting it
        const {_id} = jwt.verify(token,process.env.SECRET)
        //take the id and find the user and attach its id to the request
        //so now if we call a function in the ads then the req will have a _id function
        //so any ad post,get,etc will be able to see the user id
        req.user = await User.findOne({_id}).select('_id')
        //do the next function which allows the code in the api to continue
        next()

    } catch (error){
        console.log(error)
        res.status(401).json({error:"request is not authorized"})
    }
}

module.exports = requireAuth