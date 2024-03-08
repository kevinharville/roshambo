// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const port = 6969;
// const server = http.createServer(express);
// const wss = new WebSocket.Server({ server });

// const app = express();
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })


// server.listen(port, function() {
//   console.log(`Server is listening on ${port}!`)
// })

//chat gpt
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const app = express();

// Set up CORS middleware for Express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Create HTTP server with Express app
const server = http.createServer(app);

// Create WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket upgrade request handling
wss.on('connection', function connection(ws, req) {
    // Set CORS headers for WebSocket handshake response
    ws.on('headers', function(headers) {
        headers.push('Access-Control-Allow-Origin: *');
    });

    // Handle incoming messages
    ws.on('message', function incoming(data) {
        // Broadcast the message to all clients except the sender
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

// Start the HTTP server
server.listen(port, function() {
    console.log(`Server is listening on ${port}!`);
});