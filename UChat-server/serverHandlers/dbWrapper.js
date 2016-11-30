"use strict";

var _ = require('underscore');

class dbWrapper {

    constructor() {
        this.clients = {};
        this.rooms = [{ roomName: "lobby", description: "mainLobby", clients: [] }] // lobby is deafult by server.
    }

    addRoom(roomName, roomDescription) {
        this.rooms.push({ roomName: roomName, description: roomDescription, clients: [] });
    }

    isRoomExists(roomName) {

        var room = _.find(this.rooms, function (room) {
            return room.roomName == roomName;
        });

        return room === undefined ? false : true;
    }

    getRooms() {
        return _.map(this.rooms, function (item) { return { name: item.roomName, description: item.description }; });
    }

    getRoom(roomName) {
        var room = _.find(this.rooms, function (room) {
            return room.roomName == roomName;
        });
        return room;
    }

    addClientToRoom(roomName, nickName) {
        var room = _.find(this.rooms, function (item) {
            if (item.roomName == roomName) {
                item.clients.push(nickName);
            }
        });
    }

    removeClientFromRoom(nickName, roomName) {
        var room = _.find(this.rooms, function (item) {
            if (item.roomName == roomName) {
                item.clients = _.without(item.clients, nickName);
            }
        });
    }


    // self-explaing: remove a client from an unknown room
    // returns: the ROOM name
    removeClientFromUnknownRoom(nickName) {

        // 0 if not found
        var roomNameFound = 0;

        // remove from unknown room
        this.rooms.forEach(function (item) {
            if (_.contains(item.clients, nickName)) {
                console.log("before:" + item.clients.length);
                item.clients = _.without(item.clients, nickName);
                console.log("after:" + item.clients.length);
                roomNameFound =  item.roomName;
            }
        });

        return roomNameFound;
    }

    isClientExists(nickname) {
        var exists = false;
        for (var socketId in clients) {
            if (this.clients[socketId] == nickname) {
                exists = true;
            }
        }
        return exists;
    }

    addClient(socketId, nickname) {
        this.clients[socketId] = nickname;
    }

    removeClient(socketId) {
        delete this.clients[socketId];
    }

    getClientNickName(socketId) {
        return this.clients[socketId];
    }
}

module.exports = new dbWrapper();
