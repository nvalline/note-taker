const express = require('express');
const path = require('path');
const routerAPI = express.Router();

// API GET Routes
routerAPI.get('/notes', (req, res) => {
    res.send('API GET Route Hit');
})

// API POST Routes
routerAPI.post('/notes', (req, res) => {
    res.send('Post API Hit');
})

module.exports = routerAPI;