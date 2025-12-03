const { WebSocketServer } = require('ws');

function shelfProxy(httpServer) {

    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        socket.shareId = url.pathname.split('/').pop();
        socket.isAlive = true;

        socket.on('message', function message(data) {
            socketServer.clients.forEach(client => {
                if (client !== socket && client.shareId === socket.shareId && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    setInterval(() => {
        socketServer.clients.forEach(socket => {
            if (!socket.isAlive) {
                return socket.terminate();
            }
            socket.isAlive = false;
            socket.ping();
        });
    }, 10000);


    function broadcastToShelf(shareId, message) {
        const msg = JSON.stringify({ type: 'updateBookshelf', data: message });
        socketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.shareId === shareId) {
                client.send(msg);
            }
        });
    }

    return { socketServer, broadcastToShelf };

}

module.exports = { shelfProxy };