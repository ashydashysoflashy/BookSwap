//Create the express router
const express = require('express')
const router = express.Router()

//import the functions to handle user events
const {
    signupUser,
    loginUser,
} = require('../controllers/userController');

//login route - call the control loginUser function
router.post('/login',loginUser)


//signup route - call the controller signupUser function
router.post('/signup',signupUser)


//export the router
module.exports = router