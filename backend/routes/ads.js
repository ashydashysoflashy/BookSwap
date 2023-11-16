//Create the express router
const express = require('express');
const router = express.Router();

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

//Post an Ad
router.post('/', createAd);

//Delete an Ad
router.delete('/:id', deleteAd);

//Update an Ad
router.patch('/:id', updateAd);

//Export the router
module.exports = router;