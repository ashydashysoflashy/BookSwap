const Ad = require("../models/adModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

//Get all Ads
const getAds = async (req, res) => {
  const { search, location, minPrice, maxPrice, sort } = req.query;

  let query = {};

  if (search) {
    query.$text = { $search: search }; // Assuming you have a text index
  }

  console.log(req.query);
  console.log("uh");

  if (location) {
    query.location = location;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  let sortOptions = { createdAt: -1 }; // default sorting
  if (sort === "new") sortOptions = { createdAt: -1 };
  if (sort === "old") sortOptions = { createdAt: 1 };

  try {
    const ads = await Ad.find(query).sort(sortOptions);
    res.status(200).json(ads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Ad
const getAd = async (req, res) => {
  // Check if the ID is valid
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The Ad does not exist" });
  }

  try {
    // Find the ad by ID
    const ad = await Ad.findById(id);

    // If the ad doesn't exist, return an error
    if (!ad) {
      return res.status(404).json({ error: "The Ad does not exist" });
    }

    // Increment the views count
    ad.views = (ad.views || 0) + 1; // If views is not defined, start at 0
    await ad.save(); // Save the ad with the incremented view count

    // Return the ad with the updated views
    res.status(200).json(ad);
  } catch (error) {
    // If an error occurs, return an error status
    res.status(400).json({ error: error.message });
  }
};

//Post an Ad
const createAd = async (req, res) => {
  //Get Title and Description from Request
  const {
    user_id,
    title,
    description,
    files,
    category,
    location,
    tags,
    price,
    swapBook,
  } = req.body;
  let emptyFields = [];

  if (!user_id) emptyFields.push("user_id");
  if (!title) emptyFields.push("title");
  if (!description) emptyFields.push("description");
  if (!category) emptyFields.push("category");
  if (!location) emptyFields.push("location");
  if (!price) emptyFields.push("price");
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill the required fields", emptyFields });

  try {
    //Try and create an Ad Model and respond with status
    // using just the file names in MongoDB
    const fileNames = files.map((file) => file.name);
    const ad = await Ad.create({
      user_id,
      title,
      description,
      files: fileNames,
      category,
      location,
      tags,
      price,
      swapBook,
    });

    // Update the User's ad_ids array
    await User.findByIdAndUpdate(user_id, { $push: { ad_ids: ad._id } });

    res.status(200).json(ad);
  } catch (error) {
    //If an error occurs, respond with 400 status and error message
    res.status(400).json({ error: error.message });
  }
};

//Delete an Ad
const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The Ad does not exist" });
  }

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ error: "The Ad does not exist" });
    }

    // Check if the logged-in user is the owner of the ad
    if (ad.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this ad" });
    }

    // If authorized, delete the ad
    await Ad.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Update an Ad
const updateAd = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The Ad does not exist" });
  }

  try {
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ error: "The Ad does not exist" });
    }

    console.log(ad.user_id.toString());
    console.log(req.user._id.toString());

    // Check if the logged-in user is the owner of the ad
    if (ad.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to update this ad" });
    }

    // If authorized, update the ad
    const updatedAd = await Ad.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedAd);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ads by a specific user
const getAdsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Check if the logged-in user is the same as the user_id
    if (req.user._id.toString() !== user_id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const ads = await Ad.find({ user_id: user_id }).sort({ createdAt: -1 });

    res.status(200).json(ads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Export these functions
module.exports = {
  getAds,
  getAd,
  createAd,
  deleteAd,
  updateAd,
  getAdsByUser,
};
