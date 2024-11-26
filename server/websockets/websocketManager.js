function addClient(clients, token, ws) {
    if (!clients.has(token)) {
        clients.set(token, ws);
        console.log('New client connected', token);
    }
}

function removeClient(clients, token) {
    if (clients.size && clients.has(token)) {
        clients.delete(token);
        console.log('Client disconnected');
    }
}

function broadcast(clients, message) {
    clients.forEach((client) => {
        if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify(message));
        }
    });
}

function broadcastToClients(clients, message, sender = null) {
    clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN && ws !== sender) {
            ws.send(JSON.stringify(message));
        }
    });
}

export {
    addClient,
    removeClient,
    broadcast,
}
