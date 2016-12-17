var inMemoryDb = {
    clients: {},
    rooms : [{ roomName: "lobby", description: "main lobby", clients: [] }] 
}

module.exports = inMemoryDb;