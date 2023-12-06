//Use Mongoose for creating the Model Schema
const mongoose = require("mongoose");

//Create Schema for Ad
const Schema = mongoose.Schema;
const adSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: [
      {
        type: String,
      },
    ],
    reports:[
      {
        user_id: mongoose.Schema.Types.ObjectId,
        reason: String,
      }
    ],
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
    },
    swapBook: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    university: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a text index
adSchema.index({ title: "text", location: "text", description: "text" });

//Export the Schema
module.exports = mongoose.model("Ad", adSchema);
