var dbWrapper = require('../serverHandlers/dbWrapper')

var roomsRoutes = function (app) {

    app.post('/api/createRoom', function (req, res) {
        var roomName = req.body.name;
        var roomDescription = req.body.description;
        dbWrapper.addRoom(roomName, roomDescription);
        console.log(`New room was added: ${roomName}, description: ${roomDescription}`);
        res.send('Room was added successfully');
    });

    app.get('/api/rooms', function (req, res) {
        res.send(dbWrapper.getRooms());
    });

    app.get('/api/members/:roomName', function (req, res) {
        res.send(dbWrapper.getRoom(req.params["roomName"]).clients);
    });

};

module.exports = roomsRoutes;