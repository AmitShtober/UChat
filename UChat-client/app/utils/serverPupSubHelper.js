require('fs');
require('whatwg-fetch');
var io = require('socket.io-client');
//var server = "http://uchat-94132.onmodulus.net";
var server = "http://localhost:1337";
var socketio;

var serverPupSubHelper = {

    firstConnect: function (callback) {

        socketio = io.connect(server);

        // using func in order to remove the listener inside it.
        var func = function () {
            callback();
            removeListener('connect', func);
        };

        addListener('connect', func);
    },

    removeConnectCallback: function (callback) {
        removeListener('connect', callback);
    },

    recovery: function (connectCallBack, disconnectCallBack) {
        addListener('connect', connectCallBack);
        addListener('disconnect', disconnectCallBack);
    },

    unRecovery: function (connectCallBack, disconnectCallBack) {
        removeListener('connect', connectCallBack);
        removeListener('disconnect', disconnectCallBack);
    },

    registerToNewRoom: function (func) {
        addListener("new_room", func);
    },
    unRegisterToNewRoom: function (func) {
        removeListener("new_room", func);
    },
    enterRoom: function (currentUserNickName, roomName, oldRoomName) {
        if (socketio != undefined) {
            socketio.emit("enter_room", { nickname: currentUserNickName, roomName: roomName, oldRoomName: oldRoomName });
        }
    },

    registerToRoom: function (roomName, func) {
        addListener("room_" + roomName, func);
    },

    unRegisterToRoom: function (roomName, func) {
        removeListener("room_" + roomName, func);
    },

    sendMessage: function (roomName, nickName, message, timestamp) {
        if (socketio != undefined) {
            socketio.emit("send_message",
                { nickname: nickName, roomName: roomName, message: message, timestamp: timestamp });
        }
    },
    
    publishRoom: function (room) {
        if (socketio != undefined) {
            socketio.emit("created_room", { name: room["name"], description: room["description"] });
        }
    }
};

function addListener(listener, callback) {
    if (socketio != undefined) {
        socketio.on(listener, callback);
    }
}

function removeListener(listener, callback) {
    if (socketio != undefined) {
        socketio.removeListener(listener, callback);
    }
}

module.exports = serverPupSubHelper;