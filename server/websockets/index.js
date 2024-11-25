import { WebSocketServer } from "ws";

export default async (expressServer) => {
    // Tạo server WebSocket
    const wss = new WebSocketServer({
        server: expressServer,
        path: "/websockets",
    });

    // Quản lý các phòng
    const rooms = new Map();

    wss.on('error', console.error);

    // Khi một client kết nối
    wss.on('connection', (ws) => {

        console.log('New client connected');

        let currentRoom = null;

        ws.on('message', (data) => {
            const message = JSON.parse(data);

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