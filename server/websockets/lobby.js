import express from 'express';

function createLobbyRouter(socket) {
  const router = express.Router();

  router.get('/join', (req, res) => {
    const { roomName } = req.body;

    // Gửi thông báo tới tất cả client WebSocket
    socket.getClients().forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ type: 'NEW connect', roomName }));
      }
    });

    res.status(201).json({ message: 'NEW connect', roomName });
  });

  return router;
}

export default createLobbyRouter;