// Dependencies
var fb = require("firebase/app");
var express = require('express');
var cors = require('cors');
var path = require('path');
var url = require('url');
var fs = require('fs');

// import * as firebase from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// Local Modules
// const router = require('./routes/router.js');

// Server Initialization
var app = express();
app.use(cors());
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
    apiKey: "AIzaSyDcxnL7kvyKbFkB6F88hGieRY8xPKTvAaU",
    authDomain: "capstone-simdev.firebaseapp.com",
    projectId: "capstone-simdev",
    storageBucket: "capstone-simdev.appspot.com",
    messagingSenderId: "715734523256",
    appId: "1:715734523256:web:2dad63ac2ca7b0a6bdbc8d",
    measurementId: "G-KK7SEZN6F5"
};

// Initialize Firebase
fb.initializeApp(firebaseConfig);
console.log("Firebase initialized");