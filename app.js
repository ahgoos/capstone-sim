// Dependencies
var express = require('express');
var path = require('path');
var url = require('url');
var fs = require('fs');
var fb = require("firebase/app");
// import * as firebase from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// Local Modules
// const router = require('./routes/router.js');

// Server Initialization
var app = express();
app.use(express.static('src'));


// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/index.html'))
});
app.get('/sim', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/sim.html'))
});


// Server Listen Along with Database 
// connection(in case of data persistence)
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var port = server.address().port;
    console.log('Listening on port: ' + port);
}


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
fb.initializeApp(firebaseConfig);
console.log("Firebase initialized");