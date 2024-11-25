<script setup>
import { ref } from 'vue'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load()

    ; (async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise
        const result = await fp.get()
        
        const socket = new WebSocket('ws://localhost:3000/websockets?tk=' + result.visitorId);

    })()

</script>

<template>

    -- kết nối đến server

</template>

<style scoped></style>
