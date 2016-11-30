var underscore = require('underscore');
var dbWrapper = require('./dbWrapper');

var mainLogicEventsHandlers = function (server) {

    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {

        socket.on('created_room', function (data) {

            io.sockets.emit("new_room",
                {
                    name: data["name"],
                    description: data["description"]
                }
            );
        });

        // Handling when a new user is trying to get into a room.
        // On the first time it will be to the "lobby" room.
        socket.on('enter_room', function (data) {
            var nickName = data["nickname"];
            var roomName = data["roomName"];
            var oldRoomName = data["oldRoomName"]

            console.log(`on: enter_room | ${nickName}, roomname: ${roomName}, oldroomname: ${oldRoomName}`);

            // if the current user is moving out from an old room we will remove him.
            if (oldRoomName != '') {
                dbWrapper.removeClientFromRoom(nickName, oldRoomName);
            }

            dbWrapper.addClient(socket.id, nickName);
            dbWrapper.addClientToRoom(roomName, dbWrapper.getClientNickName(socket.id));

            // publish the change to the users
            emitChangeInRoom(roomName, "user_added", dbWrapper.getRoom(roomName).clients);

            if (oldRoomName != '') {
                emitChangeInRoom(oldRoomName, "user_left", dbWrapper.getRoom(oldRoomName).clients);
            }
        });

        // Occurs when a new message is being sent in a chat-room
        socket.on('send_message', function (data) {

            var nickName = data["nickname"];
            var roomName = data["roomName"];
            var message = data["message"];
            var timestamp = data["timestamp"];

            var action = "new_message";

            var messageData = { nickName: nickName, message: message, timestamp: timestamp };

            io.sockets.emit("room_" + roomName,
                {
                    action: action,
                    data: messageData
                }
            );

        });

        // when user leave the chat (occurs also on refresh!!)
        socket.on('disconnect', function () {
            var currentClient = dbWrapper.getClientNickName(socket.id);
            dbWrapper.removeClient(socket.id)
            var roomName = dbWrapper.removeClientFromUnknownRoom(currentClient);
            if (roomName != 0) {
                emitChangeInRoom(roomName, "user_left", dbWrapper.getRoom(roomName).clients);
            }
        });

        // publish the change which occur to the users, according to the relevant room
        function emitChangeInRoom(roomName, action, data) {
            io.sockets.emit("room_" + roomName,
                {
                    action: action,
                    data: data
                }
            );
        }


    });
}

module.exports = mainLogicEventsHandlers;