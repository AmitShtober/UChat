var express = require('express');
var path = require('path');
var cors = require('cors');
var port = process.env.PORT || 1337;
var bodyParser = require('body-parser');
var dbWrapper = require('./serverHandlers/dbWrapper')
var app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/api/createRoom', function(req, res){
  var roomName = req.body.name;
  var roomDescription = req.body.description;
  dbWrapper.addRoom(roomName, roomDescription);
  console.log(`New room was added: ${roomName}, description: ${roomDescription}`);
  res.send('Room was added successfully');
});

app.get('/api/rooms', function(req, res){
  res.send(dbWrapper.getRooms());
});

app.get('/api/members/:roomName', function(req, res){
  res.send(serverData.roomsToClients[req.params["roomName"]]);
});

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("\n\tUltraChat Server!\n\tlistening at http://%s:%s", host, port)
}); 

require("./serverHandlers/mainLogicEventsHandlers")(server);



