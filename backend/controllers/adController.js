const Ad = require('../models/adModel');
const mongoose = require('mongoose');

//Get all Ads
const getAds = async (req, res) => {
    //Find all the Ads, and sort them according to date created
    const ads = await Ad.find({}).sort({createdAt: -1});
    res.status(200).json(ads);
}

// Get a single Ad
const getAd = async (req, res) => {
    // Check if the ID is valid
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "The Ad does not exist"});
    }

    try {
        // Find the ad by ID
        const ad = await Ad.findById(id);

        // If the ad doesn't exist, return an error
        if (!ad) {
            return res.status(404).json({error: "The Ad does not exist"});
        }

        // Increment the views count
        ad.views = (ad.views || 0) + 1; // If views is not defined, start at 0
        await ad.save(); // Save the ad with the incremented view count

        // Return the ad with the updated views
        res.status(200).json(ad);

    } catch (error) {
        // If an error occurs, return an error status
        res.status(400).json({error: error.message});
    }
}

//Post an Ad
const createAd = async (req, res) => {
    //Get Title and Description from Request
    const {title, description, files, category, location, tags, price, swapBook} = req.body;
    let emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!description) emptyFields.push('description');
    if (!category) emptyFields.push('category');
    if (!location) emptyFields.push('location');
    if (!price) emptyFields.push('price');
    if (emptyFields.length > 0) return res.status(400).json({error: 'Please fill the required fields', emptyFields});

    try {
        //Try and create an Ad Model and respond with status
        // using just the file names in MongoDB
        const fileNames = files.map((file) => file.name);
        const ad = await Ad.create({title, description, files: fileNames, category, location, tags, price, swapBook});
        res.status(200).json(ad);
    } catch (error) {
        //If an error occurs, respond with 400 status and error message
        res.status(400).json({error: error.message});
    }
}

//Delete an Ad
const deleteAd = async (req, res) => {
    //Check if the ID is valid
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({error: "The Ad does not exist"});

    //Try finding Ad by ID and Deleting
    const ad = await Ad.findOneAndDelete({_id: id});
    if (!ad) return res.status(404).json({error: "The Ad does not exist"});
    res.status(200).json(ad);
}

// Update an Ad
const updateAd = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "The Ad does not exist" });
    }

    try {
        // Find the ad by ID and update it with the request body
        const ad = await Ad.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // This option asks Mongoose to return the updated document
        );

        // If the ad wasn't found, return an error
        if (!ad) {
            return res.status(404).json({ error: "The Ad does not exist" });
        }

        // Return the updated ad
        res.status(200).json(ad);
    } catch (error) {
        // If an error occurs, return an error status
        res.status(400).json({ error: error.message });
    }
};

//Export these functions
module.exports = {
    getAds,
    getAd,
    createAd,
    deleteAd,
    updateAd
}