const express = require('express');
const path = require('path');
const routerHTML = express.Router();

// GET Routes
routerHTML.get('/notes', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

routerHTML.get('*', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


module.exports = routerHTML;