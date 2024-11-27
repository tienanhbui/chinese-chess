<script setup>
import { ref } from 'vue'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const GAME_TYPE = 'tic-tac-toe';

const fpPromise = FingerprintJS.load()

    ; (async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise
        const result = await fp.get()
        
        const ws = new WebSocket('ws://localhost:3000/websockets?tk=' + result.visitorId);

        ws.onclose = (event) => {
            console.log('The connection has been closed.');
        };

    })()

</script>

<template>

    -- kết nối đến server

</template>

<style scoped></style>
