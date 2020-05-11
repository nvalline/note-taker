const express = require('express');
const fs = require('fs');
const path = require('path');
const routerAPI = express.Router();

// API GET Routes
// Deliver json notes data
routerAPI.get('/notes', (req, res) => {
    // res.send('GET API Hit');
    res.sendFile(path.join(__dirname, '../../db/db.json'));
})

// API POST Routes
// Receive & update new notes data
routerAPI.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        // Read & Push to notes array
        const dataArray = JSON.parse(data);
        dataArray.push(req.body);

        // Designate unique id num based on array index
        dataArray.forEach((item, index) => {
            item.id = index + 1;
        });

        // Write new notes json file
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(dataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    // Return 'All Good' status to client
    res.sendStatus(200);
})

// API DELETE Routes
routerAPI.delete('/notes/:id', (req, res) => {

    // Read & parse json file for array index to remove
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const targetId = req.params.id;
        const dataArray = JSON.parse(data);

        // Filter out the array object to delete & return remaining array objects
        let newDataArray = dataArray.filter((obj) => {
            return obj.id != targetId;
        });

        // Write new notes json file
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(newDataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    // Return 'All Good' status to client
    res.sendStatus(200);
})

module.exports = routerAPI;
