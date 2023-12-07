# SENG513: BookSwap Setup Guide (MERN Stack)
Developed By: Saksham Puri, Umar Ahmed, Achraf Abdelrhafour, Harsanjit Bhullar, and Youssef Abdelrhafour
## Prerequisites
**(Required)** If you don't already have Node.js installed, install Node.js and npm from the [Node.js official website](https://nodejs.org/en)

**MAKE SURE YOUR AD BLOCKER IS OFF WHEN RUNNING THIS PROJECT**

## Setup
1. Download or Clone the master branch with the "Release" tag [BookSwap github repository](https://github.com/Saksham-P/SENG513-BookSwap) and have it extracted / unzipped on your device.
2. Open the project folder in your prefered code editor ([VSCode](https://code.visualstudio.com/) is recommended).
3. Navigate to the backend folder and create a new file with the name ".env" and within the file, type the following code:
    ```
    MONGO_URI=mongodb+srv://Professor:ZlNAtXBe6sbak2OI@bookswapapp.vgssfij.mongodb.net/?retryWrites=true&w=majority
    PORT=4000
    SECRET=idkwhattotypehereidkwhattotypehereidkwhattotypeherethisisasecretkeywhich
    EMAIL_ADDRESS=bookswap513@gmail.com
    EMAIL_PASSWORD=hupd hosg tchc pctb
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
5. Using your code editor, navigate to the frontend folder and create a new file with the name ".env" once again. This time type the following code in the file:
    ```
    REACT_APP_BUCKET_NAME=seng-513-group-5
    REACT_APP_BUCKET_REGION=us-east-2
    REACT_APP_ACCESS_KEY=AKIAR6FT3DBGUCSOTP4L
    REACT_APP_SECRET_ACCESS_KEY=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
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
1. Navigate to the backend folder using your terminal and run the following command: 
    ```
    npm run dev
    ```
2. Now navigate to the frontend folder using your terminal and run the following command:
    ```
    npm start
    ```
This should connect the API to the backend server and run the frontend locally on [localhost:3000](http://localhost:3000/).
