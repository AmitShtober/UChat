var express = require('express');
var path = require('path');
var cors = require('cors');
var port = process.env.PORT || 1337;
var bodyParser = require('body-parser');
var roomRoutes = require('./routes/roomsRoutes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/api/rooms', roomRoutes);

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("\n\tUltraChat Server!\n\tlistening at http://%s:%s", host, port)
}); 

require("./handlers/eventsHandlers")(server);



