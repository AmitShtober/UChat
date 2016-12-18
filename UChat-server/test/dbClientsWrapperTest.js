var assert = require('assert');
var sinon = require('sinon');
var rewire = require('rewire');


describe('db clients wrapper functionallity', function () {

    var roomsToClientsMock;
    var dbClientsWrapper;

    beforeEach(function () {
        roomsToClientsMock = require('../dbConnectors/inMemoryDb');
        dbClientsWrapper = rewire('../dbWrappers/dbClientsWrapper');
        dbClientsWrapper.__set__({
            'roomsToClientsDatabase': roomsToClientsMock
        });
    });

    it('add client should add item to object', function () {
        dbClientsWrapper.addClient('111', 'amit');
        assert(roomsToClientsMock.clients['111'] == 'amit');
    });

    it('remove client should remove item from object', function () {
        roomsToClientsMock.clients['111'] = 'amit';

        dbClientsWrapper.removeClient('111');

        assert(('111' in roomsToClientsMock.clients) == false);
    });

    it('remove client should not remove other client from object', function () {
        roomsToClientsMock.clients['222'] = 'amit';

        dbClientsWrapper.removeClient('111');

        assert(('222' in roomsToClientsMock.clients) == true);
    });

    it('get client nickname should return the right nickname', function () {
        roomsToClientsMock.clients['222'] = 'amit';

        var nickName = dbClientsWrapper.getClientNickName('222');

        assert(nickName == 'amit');
    });

    it('isClientExists should return true if the client exists', function (done) {
        roomsToClientsMock.clients['111'] = 'amit';

        dbClientsWrapper.isClientExists('amit', function (err, exists) {
            if (exists) {
                done();
            }
        });
    });


    it('isClientExists should return true if the client exists and there are more than one client', function (done) {
        roomsToClientsMock.clients['111'] = 'amit';
        roomsToClientsMock.clients['222'] = 'yuval';

        dbClientsWrapper.isClientExists('amit', function (err, exists) {
            if (exists) {
                done();
            }
        });
    });


    it('isClientExists should return true if the client exists and the name was insert as upper case', function () {
        roomsToClientsMock.clients['111'] = 'AMIT';

        dbClientsWrapper.isClientExists('amit', function (err, exists) {
            if (exists) {
                done();
            }
        });
    });


    it('isClientExists should return true if the client exists and the name was checked as upper case', function () {
        roomsToClientsMock.clients['111'] = 'amit';

        dbClientsWrapper.isClientExists('AMIT', function (err, exists) {
            if (exists) {
                done();
            }
        });
    });


    it('isClientExists should return false if the client does not exists', function () {
        roomsToClientsMock.clients['111'] = 'amit';

        dbClientsWrapper.isClientExists('yuval', function (err, exists) {
            if (exists) {
                done();
            }
        });
    });
});
