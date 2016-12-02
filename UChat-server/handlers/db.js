var db = {
    clients: {},
    // lobby is deafult by server
    rooms : [{ roomName: "lobby", description: "mainLobby", clients: [] }] 
}

module.exports = db;