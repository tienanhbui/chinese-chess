import { WebSocketServer, WebSocket } from "ws";
import { addClient, removeClient } from "./websocketManager.js"
import * as url from 'url';

export default class Socket {

    wss;
    clients = new Map();

    constructor(expressServer) {
        this.wss = new WebSocketServer({
            server: expressServer,
            path: "/websockets",
        });

        this.wss.on('error', console.error);

        this.wss.on('connection', (ws, req) => {

            const params = url.parse(req.url, true).query;
            const token = params.tk;

            addClient(this.clients, token, ws);

            ws.on('message', (data) => {
                const message = JSON.parse(data);
                switch (message.type) {
                    case 'join': { break; }
                    case 'create_room': { break; }
                }
            });

            ws.on('close', () => {
                removeClient(this.clients, token);
            });

        });
    }

    getClients() {
        return this.clients;
    }

};