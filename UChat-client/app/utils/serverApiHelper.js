require('fs');
require('whatwg-fetch');
var serverPupSubHelper = require('./serverPupSubHelper');
var rest = require('restler');
//var server = "http://uchat-94132.onmodulus.net";
var server = "http://localhost:1337";

var serverApiHelper = {

    addRoom: function (room, callback) {
        rest.post(server + '/api/rooms/createRoom', {
            data: room,
        }).on('complete', function (data, response) {
            if (response.statusCode == 200) {
                callback(true);
                serverPupSubHelper.publishRoom(room);
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

module.exports = serverApiHelper;