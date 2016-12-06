var dbRoomsWrapper = require('../handlers/dbRoomsWrapper')

var roomsRoutes = function (app) {

    app.post('/api/createRoom', function (req, res) {
        var roomName = req.body.name;
        var roomDescription = req.body.description;
        dbRoomsWrapper.addRoom(roomName, roomDescription, function () {
            console.log(`New room was added: ${roomName}, description: ${roomDescription}`);
            res.send('Room was added successfully');
        });
    });

    app.get('/api/rooms', function (req, res) {
        dbRoomsWrapper.getRooms(function (rooms) {
            res.json(rooms);
        });
    });

    app.get('/api/members/:roomName', function (req, res) {
        res.send(dbRoomsWrapper.getRoom(req.params["roomName"]).clients);
    });

};

module.exports = roomsRoutes;