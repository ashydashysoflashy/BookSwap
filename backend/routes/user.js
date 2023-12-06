//Create the express router
const express = require('express')
const router = express.Router()
const requireAuth = require("../middleware/requireAuth");


//Import the functions to handle user events
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
    banUser, 
    getFavoriteAds,
    getIsFavorite,
    addFavoriteAd,
    removeFavoriteAd,
} = require('../controllers/userController');

// login route
router.post('/login', loginUser);

//signup route - call the controller signupUser function
router.post('/signup',signupUser)

//routes for resetting and updating password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', requireAuth, changePassword);


// signup route
router.post('/signup', signupUser);

// Get a single user's name
router.get("/:id", getUsername);

// Check if a user is an admin
router.get("/isAdmin/:id", getUserAdmin);

// Check if a user is banned
router.get("/isBanned/:id", getIsBanned);

// Ban a user
router.post("/admin/banuser/:id", banUser);

// Get favorite status of an ad for a user
router.get('/favorites/:user_id/:ad_id', getIsFavorite);

// Get all favorite ads for a user
router.get('/favorites/:user_id', getFavoriteAds);

// Add an ad to a user's favorites
router.post('/favorites/add', addFavoriteAd);

// Remove an ad from a user's favorites
router.delete('/favorites/remove', removeFavoriteAd);

// export the router
module.exports = router;