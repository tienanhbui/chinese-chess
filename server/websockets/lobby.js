import express from 'express';

function createLobbyRouter(socket) {

    const router = express.Router();

    router.post('/join', (req, res) => {

        const token = req.query.tk;
        const { gameType } = req.body;

        if (!token) return res.status(401);

        const clients = [];
        socket.getClients().forEach((client) => {

            if (client.userStates.token == token) {
                client.userStates.gameType = gameType;
                client.userStates.location = 'lobby';
            }

            if (client.userStates.gameType == gameType && client.userStates.location == 'lobby') {
                clients.push(client);
            }
            
        });

        const clientsMap = clients.map((client) => {
            return {
                noId: client.userStates.noId,
            }
        });

        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];

            if (client.readyState === 1) { // WebSocket.OPEN
                client.send(JSON.stringify({ type: 'jlb', clients: clientsMap }));
            }
        }

        res.status(201).json({ message: 'Joined', gameType });
    });

    return router;
}

export default createLobbyRouter;