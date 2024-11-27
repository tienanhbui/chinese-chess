import { WebSocketServer, WebSocket } from "ws";
import { addClient, broadcastToClients, removeClient } from "./websocketManager.js"
import * as url from 'url';
import * as crypto from 'crypto';

const PING_DURATION = 30000;
export default class Socket {

    wss;
    clients = new Map();

    constructor(expressServer) {

        this.wss = new WebSocketServer({
            server: expressServer,
            path: "/websockets",
        });

        this.wss.binaryType = "arraybuffer";

        const interval = setInterval(() => {

            this.wss.clients.forEach((client) => {
                if (!client.isAlive) return client.terminate();
                client.isAlive = false;
                client.ping();
            });

        }, PING_DURATION);

        this.wss.on('error', console.error);

        this.wss.on('connection', (ws, req) => {

            const params = url.parse(req.url, true).query;
            const token = params.tk;

            ws.userStates = {
                token,
                noId: crypto.createHash('md5').update(new Date().getTime().toString()).digest('hex')
            }

            addClient(this.clients, token, ws);

            ws.isAlive = true;
            ws.on('pong', () => {
                ws.isAlive = true
            });

            ws.on('message', (data) => {

                if (data instanceof String) {
                    const message = JSON.parse(data);
                    switch (message.type) {
                        case 'join': { break; }
                        case 'create_room': { break; }
                    }
                }

                if (Buffer.isBuffer(data)) {
                    ws.send(data);
                }

            });

            ws.on('close', () => {
                removeClient(this.clients, token, ws);
                clearInterval(interval);
            });

        });
    }

    getClients() {
        return this.clients;
    }

};