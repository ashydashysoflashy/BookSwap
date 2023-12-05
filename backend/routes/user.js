//Create the express router
const express = require('express')
const router = express.Router()

//import the functions to handle user events
const {
    signupUser,
    loginUser,
    getUserEmailById,
    getUsername,
    getUserAdmin,
} = require('../controllers/userController');

//login route - call the control loginUser function
router.post('/login',loginUser)


//signup route - call the controller signupUser function
router.post('/signup',signupUser)

//Get a single user
router.get("/:id", getUsername);

//Get a single user
router.get("/isAdmin/:id", getUserAdmin);


//export the router
module.exports = router