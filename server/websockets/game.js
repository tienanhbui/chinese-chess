import express from 'express';

function createGameRouter(socket, rooms) {
    
    const router = express.Router();

    router.get('/join-room', (req, res) => {
        const { roomName } = req.body;

        res.status(201).json({ message: 'NEW connect', roomName });
    });

    return router;
}

export default createGameRouter;