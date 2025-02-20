const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors'); // Import CORS
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/usps-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/chat', chatRoutes);

// WebSocket Server
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Ensure the message is sent as a string
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});