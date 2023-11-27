const Ad = require('../models/adModel');
const mongoose = require('mongoose');

//Get all Ads
const getAds = async (req, res) => {
    //Find all the Ads, and sort them according to date created
    const ads = await Ad.find({}).sort({createdAt: -1});
    res.status(200).json(ads);
}

//Get a single Ad
const getAd = async (req, res) => {
    //Check if the ID is valid
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "The Ad does not exist"});
    }

    //Try finding Ad by ID
    const ad = await Ad.findById(id);

    //If could not find, send error otherwise send good status
    if (!ad) return res.status(404).json({error: "The Ad does not exist"});
    res.status(200).json(ad);
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

//Update an Ad
const updateAd = async (req, res) => {
    //Check if the ID is valid
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({error: "The Ad does not exist"});

    //Try finding Ad by ID and updating
    const ad = await Ad.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if (!ad) return res.status(404).json({error: "The Ad does not exist"});
    res.status(200).json(ad);

}

//Export these functions
module.exports = {
    getAds,
    getAd,
    createAd,
    deleteAd,
    updateAd
}