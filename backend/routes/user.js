//Create the express router
const express = require('express')
const router = express.Router()
const requireAuth = require("../middleware/requireAuth");


//import the functions to handle user events
const {
    signupUser,
    loginUser,
    forgotPassword,
    resetPassword,
    changePassword,
    getUserEmailById,
    getUsername,
    getUserAdmin,
    getIsBanned,
    banUser
} = require('../controllers/userController');

//login route - call the control loginUser function
router.post('/login',loginUser)

//signup route - call the controller signupUser function
router.post('/signup',signupUser)

//routes for resetting and updating password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', requireAuth, changePassword);

//Get a single user
router.get("/:id", getUsername);

//Get a single user
router.get("/isAdmin/:id", getUserAdmin);

router.get("/isBanned/:id", getIsBanned);

//Delete a user
router.post("/admin/banuser/:id", banUser);


//export the router
module.exports = router