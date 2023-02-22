const { Router } = require('express');

// Initialization
const router = Router();

// Methods to be executed on routes
const method1 = (req, res) => {
    res.send("Hello, Welcome to our Page");
}

const method2 = (req, res) => {
    res.send("Hello, This was a post Request");
}

// Requests 
router.get('/', method1);
router.post('/', method2);

module.exports = router;