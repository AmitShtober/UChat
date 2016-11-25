var serverData = {
    rooms: [{name:"lobby",description:"mainLobby"}],
    clients : {},
    roomsToClients : { lobby: [] } // lobby is deafult by server.
};

module.exports = serverData;
