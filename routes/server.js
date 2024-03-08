const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;  //was 6969
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })


wss.on('connection', function connection(ws) {
    // Event handler for when the connection is open
    ws.on('open', function open() {
      // Here, you can send messages once the connection is open
      // For example, you can send a welcome message
      ws.send('Welcome to the WebSocket server!');
    });
  
    // Event handler for incoming messages
    ws.on('message', function incoming(data) {
      // Loop through all clients and send the message to each one
      wss.clients.forEach(function each(client) {
        // Ensure the client is not the sender and its connection is open
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });


server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})