"use strict";
var db = require('./db');
var _ = require('underscore');

class dbRoomsWrapper {

    addRoom(roomName, roomDescription) {
        db.rooms.push({ roomName: roomName, description: roomDescription, clients: [] });
    }

    isRoomExists(roomName) {

        var room = _.find(db.rooms, function (room) {
            return room.roomName == roomName;
        });

        return room === undefined ? false : true;
    }

    getRooms() {
        return _.map(db.rooms, function (item) { return { name: item.roomName, description: item.description }; });
    }

    getRoom(roomName) {
        var room = _.find(db.rooms, function (room) {
            return room.roomName == roomName;
        });
        return room;
    }

    addClientToRoom(roomName, nickName) {
        var room = _.find(db.rooms, function (item) {
            if (item.roomName == roomName) {
                item.clients.push(nickName);
            }
        });
    }


    removeClientFromRoom(nickName, roomName) {

        // if the room is known
        if (roomName != undefined) {

            var room = _.find(db.rooms, function (item) {
                if (item.roomName == roomName) {
                    item.clients = _.without(item.clients, nickName);
                }
            });

        } else {

            // self-explaing: remove a client from an unknown room
            // returns: the ROOM name

            // 0 if not found
            var roomNameFound = 0;

            // remove from unknown room
            db.rooms.forEach(function (item) {
                if (_.contains(item.clients, nickName)) {
                    console.log("before:" + item.clients.length);
                    item.clients = _.without(item.clients, nickName);
                    console.log("after:" + item.clients.length);
                    roomNameFound = item.roomName;
                }
            });

            return roomNameFound;
        }


    }
}

module.exports = new dbRoomsWrapper();