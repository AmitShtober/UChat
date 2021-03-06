"use strict";
var _ = require('underscore');
var roomsDatabase = require("../dbConnectors/mysqlDb");
var roomsToClientsDatabase = require("../dbConnectors/inMemoryDb");

class dbRoomsWrapper {

    init() {
        var rooms = this.getRooms(function (err, rooms) {
            if (err != undefined) {
                console.log("error in init of db rooms wrapper:" + err);
            } else {
                rooms.forEach(function (item) {
                    this.addRoomToInMemoryDataBase(item.name, item.description);
                }.bind(this));
            }
        }.bind(this));
    }

    addRoom(roomName, roomDescription, callback) {
        roomsDatabase.insert('rooms', { room: roomName, description: roomDescription }, function (err, rows, fields) {
            this.addRoomToInMemoryDataBase(roomName, roomDescription);
            callback(err);
        }.bind(this));
    }

    addRoomToInMemoryDataBase(roomName, roomDescription) {
        roomsToClientsDatabase.rooms.push({ roomName: roomName, description: roomDescription, clients: [] });
    }

    getRooms(callback) {
        roomsDatabase.select('select * from rooms', function (err, rows, fields) {
            if (callback != undefined) {
                callback(err, rows);
            }
        });
    }

    getRoomClients(roomName) {
        return this.getRoomSync(roomName).clients;
    }

    addClientToRoom(roomName, nickName) {
        this.getRoomSync(roomName).clients.push(nickName);
    }

    removeClientFromRoom(nickName, roomName) {
        // if the room is known
        if (roomName != undefined) {
            var room = this.getRoomSync(roomName);
            room.clients = _.without(room.clients, nickName);
        } else {

            // self-explaing: remove a client from an unknown room
            // returns: the ROOM name

            // 0 if not found
            var roomNameFound = 0;

            // remove from unknown room
            roomsToClientsDatabase.rooms.forEach(function (item) {
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

    getRoomAsync(roomName, callback) {
        _.find(roomsToClientsDatabase.rooms, function (item) {
            if (item.roomName.toLowerCase() == roomName.toLowerCase()) {
                callback(item);
            }
        });
    }

    getRoomSync(roomName, callback) {
        var room = undefined;
        _.find(roomsToClientsDatabase.rooms, function (item) {
            if (item.roomName.toLowerCase() == roomName.toLowerCase()) {
                room = item;
            }
        });
        return room;
    }
}

var dbRoomsWrapperObject = new dbRoomsWrapper();

dbRoomsWrapperObject.init();

module.exports = new dbRoomsWrapper();
