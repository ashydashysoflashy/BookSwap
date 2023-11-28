//Create the express router
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//All Ad Controller functions
const {
    getAds,
    getAd,
    createAd,
    deleteAd,
    updateAd
} = require('../controllers/adController');

//Get all the Ads
router.get('/', getAds);

//Get a single Ad
router.get('/:id', getAd);

//ALL THE FUNCTIONS AFTER THIS LINE OF CODE REQUIRE AUTHORIZATION
router.use(requireAuth)

//Post an Ad
router.post('/', createAd);

//Delete an Ad
router.delete('/:id', deleteAd);

//Update an Ad
router.patch('/:id', updateAd);

//Export the router
module.exports = router;