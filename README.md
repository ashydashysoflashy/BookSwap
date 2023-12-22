# SENG513: BookSwap Setup Guide (MERN Stack)
Developed By: Saksham Puri, Umar Ahmed, Achraf Abdelrhafour, Harsanjit Bhullar, and Youssef Abdelrhafour

## Project Demo Links
Product Features Demo: https://www.youtube.com/watch?v=XDlV8RmcyN8

Technical Demo: https://www.youtube.com/watch?v=j8bzWx25fLo

## Prerequisites
**This project can be run locally as it is not hosted anywhere at the moment**

**(Required)** If you don't already have Node.js installed, install Node.js and npm from the [Node.js official website](https://nodejs.org/en)

**MAKE SURE YOUR AD BLOCKER IS OFF WHEN RUNNING THIS PROJECT**

**Before being able to run the project, ensure you already have:**
- A MongoDB database: used to store customer and listing data (we used MongoDB Atlas)
- An Amazon AWS S3 Bucket: used to store the images. Within this bucket create an empty folder called /images, where ad images are fetched by name

## Setup
1. Download or Clone the master branch with the "Release" tag [BookSwap github repository](https://github.com/Saksham-P/SENG513-BookSwap) and have it extracted / unzipped on your device.
2. Open the project folder in your prefered code editor ([VSCode](https://code.visualstudio.com/) is recommended).
3. Navigate to the backend folder and create a new file with the name ".env" and within the file, insert your own following information:
    ```
    MONGO_URI<insert your Mongo Database URI link here, with appropriate credentials>
    PORT=<insert whatever port number you want to use>
    SECRET=<insert a random string here>
    EMAIL_ADDRESS=<insert the email address you wish to use as the website's e-mail>
    EMAIL_PASSWORD=<insert the application password for the e-mail here> 
    ```
    - `MONGO_URI` contains the username and password for a user to connect to the mongoDB database
    - `PORT` contains the port number that will be used for API connection
    - `SECRET` is a key used to help with authentication
    - `EMAIL_ADDRESS` is the email address the website uses to communicate with users
    - `EMAIL_PASSWORD` is the email password used for authentication of the Email

4. Open a terminal and navigate to the backend folder. Now, run the following command: 
    ```
    npm install
    ```
5. Using your code editor, navigate to the frontend folder and create a new file with the name ".env" once again. Insert your own information here:
    ```
    REACT_APP_BUCKET_NAME=<insert your Amazon AWS S3 Bucket name here>
    REACT_APP_BUCKET_REGION=<insert your bucket's region here>
    REACT_APP_ACCESS_KEY=<insert the access key for the bucket here>
    REACT_APP_SECRET_ACCESS_KEY=<insert the secret access key for the bucket here>
    ```
    - `REACT_APP_BUCKET_NAME` contains the name of the bucket we will be using from AWS
    - `REACT_APP_BUCKET_REGION` contains region we will be using
    - `REACT_APP_ACCESS_KEY` is the access key that lets us access the bucket
    - `REACT_APP_SECRET_ACCESS_KEY` is the credentials that actually authorizes us to have access to the bucket

6.  Open a terminal and navigate to the frontend folder in the terminal. Now once again, run the following command:
    ```
    npm install
    ```
This should have installed all the needed dependencies for running the project and should have given the you access to the databases and services being used

## Running the Project
To run the project both backend and frontend commands must be ran.
1. Navigate to the backend folder using your terminal and run the following command: 
    ```
    npm run dev
    ```
2. Now navigate to the frontend folder using your terminal and run the following command:
    ```
    npm start
    ```
This should connect the API to the backend server and run the frontend locally on [localhost:3000](http://localhost:3000/).

## Admin Account for BookSwap
Your admin account would need to be created in the backend (MongoDB), with a boolean value admin set to true.
This is because admins shouldn't be able to sign up via the website. 

This account is used for accessing admin page in BookSwap.
