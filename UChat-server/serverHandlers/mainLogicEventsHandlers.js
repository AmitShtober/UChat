var underscore = require('underscore');
var serverData = require('./serverData');

var mainLogicEventsHandlers = function (server) {

    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {

        socket.on('created_room', function(data){
            console.log(data);
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

            // if the current user is moving out from an old room we will remove him.
            if (oldRoomName != '') {
                removeClientFromSpesificRoom(nickName, oldRoomName);
            }

            serverData.clients[socket.id] = nickName;
            var currentClient = serverData.clients[socket.id];
            serverData.roomsToClients[roomName].push(currentClient);

            // publish the change to the users
            emitChangeInRoom(roomName, "user_added", serverData.roomsToClients[roomName]);
        });

        // Occurs when a new message is being sent in a chat-room
        socket.on('send_message', function (data) {

            var nickName = data["nickname"];
            var roomName = data["roomName"];
            var message = data["message"];
            var timestamp = data["timestamp"];

            var action = "new_message";

            var messageData = { nickName: nickName, message: message, timestamp: timestamp };

            console.info(action + " Nickname:" + nickName + ", RoomName:" + roomName + ", Message:" + message + ", timestamp:" + timestamp)

            io.sockets.emit("room_" + roomName,
                {
                    action: action,
                    data: messageData
                }
            );

        });

        // when user leave the chat (occurs also on refresh!!)
        socket.on('disconnect', function () {
            var currentClient = serverData.clients[socket.id];
            delete serverData.clients[socket.id];
            var roomName = removeClientFromUnknownRoom(currentClient);
            if (roomName != 0) {
                emitChangeInRoom(roomName, "user_left", serverData.roomsToClients[roomName]);
            }
            console.info("disconnect, current users :" + Object.keys(serverData.clients).length)
        });

        // publish the change which occur to the users, according to the relevant room
        function emitChangeInRoom(roomName, action, data) {
            console.info(roomName + " " + action + " " + data);
            io.sockets.emit("room_" + roomName,
                {
                    action: action,
                    data: data
                }
            );
        }


        function removeClientFromSpesificRoom(nickName, roomName) {
            serverData.roomsToClients[roomName] = _.without(serverData.roomsToClients[roomName], nickName);
        }

        // self-explaing: remove a client from an unknown room
        // returns: the ROOM name
        function removeClientFromUnknownRoom(nickName) {
            // remove from unknown room
            for (var key in serverData.roomsToClients) {
                if (underscore._.contains(serverData.roomsToClients[key], nickName)) {
                    serverData.roomsToClients[key] = underscore._.without(serverData.roomsToClients[key], nickName);
                    return key;
                }
            }
            return 0;
        }

    });
}

module.exports = mainLogicEventsHandlers;