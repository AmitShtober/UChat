"use strict";
var _ = require('underscore');
var roomsDatabase = require("../dbConnectors/mysqlDb");
var roomsToClientsDatabase = require("../dbConnectors/inMemoryDb");

class dbRoomsWrapper {

    init(){
        var rooms = this.getRooms(function(rooms){
            rooms.forEach(function(item){
                this.addRoomToInMemoryDataBase(item.name, item.description);
            }.bind(this));
        }.bind(this));
    }

    addRoom(roomName, roomDescription, callback) {
        roomsDatabase.insert('rooms', { room: roomName, description: roomDescription }, function (err, rows, fields) {
            if (err) throw err;
            this.addRoomToInMemoryDataBase(roomName, roomDescription);
            callback(rows);
        }.bind(this));
    }

    addRoomToInMemoryDataBase(roomName, roomDescription){
         roomsToClientsDatabase.rooms.push({ roomName: roomName, description: roomDescription, clients: [] });
    }

    getRooms(callback) {
        roomsDatabase.select('select * from rooms', function (err, rows, fields) {
            if (err) throw err;
            callback(rows);
        });
    }

    getRoomClients(roomName) {
        var room = _.find(roomsToClientsDatabase.rooms, function (room) {
            return room.roomName == roomName;
        });
        return room.clients;
    }

    addClientToRoom(roomName, nickName) {
        var room = _.find(roomsToClientsDatabase.rooms, function (item) {
            if (item.roomName == roomName) {
                item.clients.push(nickName);
            }
        });
    }

    removeClientFromRoom(nickName, roomName) {
        // if the room is known
        if (roomName != undefined) {

            var room = _.find(roomsToClientsDatabase.rooms, function (item) {
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
}

var dbRoomsWrapperObject = new dbRoomsWrapper();

dbRoomsWrapperObject.init();

module.exports = new dbRoomsWrapper();
