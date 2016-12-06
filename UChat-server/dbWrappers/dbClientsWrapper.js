"use strict";
var roomsToClientsDatabase = require('../dbConnectors/inMemoryDb');
var _ = require('underscore');

class dbClientsWrapper {
    isClientExists(nickname, callback) {
        try {
            var exists = false;
            for (var socketId in roomsToClientsDatabase.clients) {
                if (roomsToClientsDatabase.clients[socketId].toLowerCase() == nickname.toLowerCase()) {
                    exists = true;
                }
            }
            callback(undefined, exists);
        }
        catch (err) {
            callback(err, false);
        }
    }

    addClient(socketId, nickname) {
        roomsToClientsDatabase.clients[socketId] = nickname;
    }

    removeClient(socketId) {
        delete roomsToClientsDatabase.clients[socketId];
    }

    getClientNickName(socketId) {
        return roomsToClientsDatabase.clients[socketId];
    }
}

module.exports = new dbClientsWrapper();
