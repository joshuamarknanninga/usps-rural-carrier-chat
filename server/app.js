const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// WebSocket Server
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});