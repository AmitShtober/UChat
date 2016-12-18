var assert = require('assert');

describe('in memory db properties should be defnied', function () {
    var db = require('../dbConnectors/inMemoryDb');

    beforeEach(function () {
        db = require('../dbConnectors/inMemoryDb');
    });

    it('db clients should be defined', function () {
        assert(db.clients != undefined);
    });

    it('db rooms should be defined', function () {
        assert(db.rooms != undefined);
    });
});

describe('in memory db rooms prop should have initial state', function () {
    var db = require('../dbConnectors/inMemoryDb');

    beforeEach(function () {
        db = require('../dbConnectors/inMemoryDb');
    });

    it('db rooms prop should have zero items ', function () {
        assert(db.rooms.length == 0);
    });
});