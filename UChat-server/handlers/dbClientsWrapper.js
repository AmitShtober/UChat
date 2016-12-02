"use strict";
var db = require('./db');
var _ = require('underscore');

class dbClientsWrapper {
    isClientExists(nickname) {
        var exists = false;
        for (var socketId in clients) {
            if (db.clients[socketId] == nickname) {
                exists = true;
            }
        }
        return exists;
    }

    addClient(socketId, nickname) {
        db.clients[socketId] = nickname;
    }

    removeClient(socketId) {
        delete db.clients[socketId];
    }

    getClientNickName(socketId) {
        return db.clients[socketId];
    }
}

module.exports = new dbClientsWrapper();
