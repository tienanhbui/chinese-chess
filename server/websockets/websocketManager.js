import { WebSocket } from "ws";

function addClient(clients, token, ws) {

    if (clients.has(token)) {
        clients.get(token).close(1008, 'Duplicate connection');
    }

    clients.set(token, ws);

    console.log('New client connected', ws.userStates);
}

function removeClient(clients, token, ws) {
    if (clients.has(token) && clients.get(token) === ws) {
        clients.delete(token);
        console.log('Client disconnected', token);
    }
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
    broadcastToClients,
}
