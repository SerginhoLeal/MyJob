const socketio = require('socket.io');
const parseStrings = require('./src/controllers/parseString');

const connections = [];

let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const {elo} = socket.handshake.query;

        connections.push({
            id:socket.id,
            elo:parseStrings(elo),
        });
    });
};

exports.findConnections = (elo) => {
    return connections.filter(connection => {
        return connection.elo.some(item => elo.includes(item))
    });
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
};