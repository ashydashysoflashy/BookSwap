//Setup .env file for safer API calls
require('dotenv').config({ path: './.env'});

//Setup Express
const express = require('express');
const app = express();

//Require mongoose for creating schemas
const mongoose = require('mongoose');

//Setup CORS (Cross Origin Resource Sharing)
const cors = require('cors');

//Store PORT in port variable
const port = process.env.PORT;

//Middleware
app.use(cors());
app.use(express.json());

//Route for Ads
app.use('/api/ads', require('./routes/ads'));

//Route for user info (login/signup)
app.use('/api/user',require('./routes/user'))

// Route for email sending
app.use('/api/email',require('./routes/emails'))


//Connect with database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for Requests
        app.listen(port, () => {
            console.log(`Connected to MongoDB & Listening to Port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });