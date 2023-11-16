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
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true});

//Export the Schema
module.exports = mongoose.model('Ad', adSchema);