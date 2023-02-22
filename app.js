// Dependencies
const express = require('express');
const path = require('path');
const url = require('url');
const fs = require('fs');
// const fb = require("firebase/app");
// import * as firebase from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// Local Modules
// const router = require('./routes/router.js');
const router = express.Router();


// Server Initialization
const app = express();
const PORT = 3000;
console.log("Express initialized, port " + PORT);

// Middlewares
app.use(express.json());

// Routes will be written here
app.use('/route', router);
// Requests 
router.get('/', (req, res) => {
    res.send("Hello, Welcome to our Page");
}
);
router.post('/', (req, res) => {
    res.send("Hello, This was a post Request");
}
);


// Server Listen Along with Database 
// connection(in case of data persistence)
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
}
);


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxmgGPPMaRY5jtd5lNxNZfSrs02pkFI-M",
    authDomain: "capstone-sim.firebaseapp.com",
    projectId: "capstone-sim",
    storageBucket: "capstone-sim.appspot.com",
    messagingSenderId: "912739197756",
    appId: "1:912739197756:web:afc9b2b199b8e6d5d17439",
    measurementId: "G-VM7ZMJMDFV"
};

// Initialize Firebase
// fb.initializeApp(firebaseConfig);
// console.log("Firebase initialized");
