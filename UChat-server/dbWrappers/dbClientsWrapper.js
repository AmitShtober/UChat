"use strict";
var roomsToClientsDatabase = require('../dbConnectors/inMemoryDb');
var _ = require('underscore');

class dbClientsWrapper {
    isClientExists(nickname) {
        var exists = false;
        for (var socketId in clients) {
            if (roomsToClientsDatabase.clients[socketId] == nickname) {
                exists = true;
            }
        }
        return exists;
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
