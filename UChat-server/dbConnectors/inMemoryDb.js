var inMemoryDb = {
    clients: {},
    rooms : [{ roomName: "lobby", description: "mainLobby", clients: [] }] 
}

module.exports = inMemoryDb;