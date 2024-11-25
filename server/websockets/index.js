import { WebSocketServer, WebSocket } from "ws";
import * as url from 'url';

const rooms = new Map();
const clients = new Map();

function broadcastToClients(clients, message, sender = null) {
    clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN && ws !== sender) {
            ws.send(JSON.stringify(message));
        }
    });
}

export default async (expressServer) => {
    // Tạo server WebSocket
    const wss = new WebSocketServer({
        server: expressServer,
        path: "/websockets",
    });

    setInterval(() => {    
        broadcastToClients(clients, { type: 'info', message: 'This is a server-wide announcement!' });
    }, 5000);

    wss.on('error', console.error);

    // Khi một client kết nối
    wss.on('connection', (ws, req) => {

        const params = url.parse(req.url, true).query;
        const token = params.tk;

        console.log('New client connected', token);
        // console.log(`Client readyState: ${ws.readyState}`); // 1 for "OPEN"

        if (!clients.has(token)) {
            clients.set(token, ws);
        }

        let currentRoom = null;

        ws.on('message', (data) => {
            const message = JSON.parse(data);
            switch (message.type) {
                case 'join': {break;}
                case 'create_room': {break;}
            }

        });

        ws.on('close', () => {
            if (currentRoom && rooms.has(currentRoom)) {
                rooms.get(currentRoom).delete(ws);
                if (rooms.get(currentRoom).size === 0) {
                    rooms.delete(currentRoom);
                }
            }
            console.log('Client disconnected');
        });
        
    });
};