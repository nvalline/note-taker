const express = require('express');
const fs = require('fs');
const path = require('path');
const routerAPI = express.Router();

// API GET Routes
routerAPI.get('/notes', (req, res) => {
    // res.send('GET API Hit');
    res.sendFile(path.join(__dirname, '../../db/db.json'));
})

// API POST Routes
routerAPI.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const dataArray = JSON.parse(data);
        dataArray.push(req.body);

        dataArray.forEach((item, index) => {
            item.id = index + 1;
        });

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(dataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    res.sendStatus(200);
})

// API DELETE Routes
routerAPI.delete('/notes/:id', (req, res) => {
    console.log('Delete Hit id: ' + req.params.id)

    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const targetId = req.params.id;
        const dataArray = JSON.parse(data);

        let newDataArray = dataArray.filter((obj) => {
            return obj.id != targetId;
        });

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(newDataArray), (err) => {
            if (err) throw err;
            console.log('File write successful!')
        });
    });

    res.sendStatus(200);
})

module.exports = routerAPI;
