//Use Mongoose for creating the Model Schema
const mongoose = require('mongoose');

//Create Schema for Ad
const Schema = mongoose.Schema
const adSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: [{
        type: String
    }],
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    price: {
        type: Number,
    },
    swapBook: {
        type: String,
    },
    views: { 
        type: Number, 
        default: 0 
    }
}, {timestamps: true});

//Export the Schema
module.exports = mongoose.model('Ad', adSchema);