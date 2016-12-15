"use strict";

var mysql = require('mysql');

var config = require('config');

if (config.has('configuration.dbConfig')) {
    var dbConfiguration = config.get('configuration.dbConfig');
} else {
    throw "no configuration for:" + process.env.node_env + ". server goes down.";
}

class mysqlDb {

    constructor(host, user, password, dbname) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: dbname
        });

        this.handleDisconnect(this.connection);
    }

    select(query, callback) {
        this.connection.query(query, function (err, rows, fields) {
            callback(err, rows, fields);
        });
    };
    insert(table, data, callback) {
        this.connection.query('INSERT INTO ' + table + ' (name, description) VALUES (?,?)', [data.room, data.description], function (err, result) {
            callback(err, result);
        });
    }

    // from stackoverflow: the old way doesnt work.
    // we should listen to the error event and just reconnect.
    handleDisconnect(connection) {
        connection.on('error', function (err) {
            if (!err.fatal) {
                return;
            }

            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                throw err;
            }

            console.log('Re-connecting lost connection: ' + err.stack);

            connection = mysql.createConnection(connection.config);
            this.handleDisconnect(connection);
            connection.connect();
        }.bind(this));
    }

};

module.exports = new mysqlDb(dbConfiguration.host, dbConfiguration.username, dbConfiguration.password, dbConfiguration.dbName);