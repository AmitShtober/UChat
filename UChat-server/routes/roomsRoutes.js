var express = require('express');
var router = express.Router();
var dbRoomsWrapper = require('../dbWrappers/dbRoomsWrapper');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/createRoom', function (req, res) {
    var roomName = req.body.name;
    var roomDescription = req.body.description;
    dbRoomsWrapper.addRoom(roomName, roomDescription, function () {
        console.log(`New room was added: ${roomName}, description: ${roomDescription}`);
        res.send('Room was added successfully');
    });
});

router.get('/rooms', function (req, res) {
    dbRoomsWrapper.getRooms(function (rooms) {
        res.json(rooms);
    });
});

router.get('/members/:roomName', function (req, res) {
    res.send(dbRoomsWrapper.getRoom(req.params["roomName"]).clients);
});

module.exports = router;