var express = require('express');
var router = express.Router();
var dbRoomsWrapper = require('../dbWrappers/dbRoomsWrapper');


router.post('/createRoom', function (req, res, next) {
    var roomName = req.body.name;
    var roomDescription = req.body.description;
    dbRoomsWrapper.addRoom(roomName, roomDescription, function (err) {
        if (err != undefined) {
            next(err)
        } else {
            console.log(`New room was added: ${roomName}, description: ${roomDescription}`);
            res.send('Room was added successfully');
        }
    });
});

router.get('/rooms', function (req, res) {
    dbRoomsWrapper.getRooms(function (err, rooms) {
        if (err != undefined) {
            next(err)
        } else {
            res.json(rooms);
        }
    });
});

router.get('/members/:roomName', function (req, res) {
    res.send(dbRoomsWrapper.getRoom(req.params["roomName"]).clients);
});



module.exports = router;