require('fs');
require('whatwg-fetch');
var io = require('socket.io-client');
var rest = require('restler');
//var server = "http://uchat-94132.onmodulus.net";
var sever = "http://localhost:1337/";
var socketio;

var serverHelpers = {
    connect: function (callback) {
        socketio = io.connect(server);
        socketio.on('connect', callback);
    },

    recovery: function (connectCallBack, disconnectCallBack) {
        socketio.on('connect', connectCallBack);
        socketio.on('disconnect', disconnectCallBack);
    },
    unRecovery: function (connectCallBack, disconnectCallBack) {
        socketio.removeListener('connect', connectCallBack);
        socketio.removeListener('disconnect', disconnectCallBack);
    },

    registerToNewRoom: function (func) {
        if (socketio != undefined) {
            socketio.on("new_room", func);
        }
    },
    unRegisterToNewRoom: function (func) {
        if (socketio != undefined) {
            socketio.removeListener("new_room", func);
        }
    },
    enterRoom: function (currentUserNickName, roomName, oldRoomName) {
        if (socketio != undefined) {
            socketio.emit("enter_room", { nickname: currentUserNickName, roomName: roomName, oldRoomName: oldRoomName });
        }
    },

    registerToRoom: function (roomName, func) {
        if (socketio != undefined) {
            socketio.on("room_" + roomName, func);
        }
    },

    unRegisterToRoom: function (roomName, func) {
        if (socketio != undefined) {
            socketio.removeListener("room_" + roomName, func);
        }
    },

    sendMessage: function (roomName, nickName, message, timestamp) {
        if (socketio != undefined) {
            socketio.emit("send_message",
                { nickname: nickName, roomName: roomName, message: message, timestamp: timestamp });
        }
    },

    addRoom: function (room, callback) {
        rest.post(server + '/api/rooms/createRoom', {
            data: room,
        }).on('complete', function (data, response) {
            if (response.statusCode == 200) {
                callback(true);
                if (socketio != undefined) {
                    socketio.emit("created_room", { name: room["name"], description: room["description"] })
                }
            } else {
                callback(false);
            }
        });
    },

    getRooms: function (callback) {
        fetch(server + '/api/rooms/rooms')
            .then(status)
            .then(json)
            .then(function (data) {
                callback(data);
            });
    },

    isUserExists: function (username, callback) {
        fetch(server + '/api/users/exists/' + username)
            .then(status)
            .then(json)
            .then(function (data) {
                callback(true, JSON.parse(data));
            }).catch(error => callback(false, error));
    }
};

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

module.exports = serverHelpers;