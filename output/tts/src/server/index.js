const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Store connected clients with their IPs
// Map: socket.id -> { socket, ip }
const clients = new Map();

// Serve static files from the 'public' directory within src
app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
  // Get client IP address. Note: In some environments (e.g., behind proxies),
  // this might be the proxy's IP or require looking at headers like 'X-Forwarded-For'.
  // For a simple local setup, handshake.address is usually sufficient.
  const clientIp = socket.handshake.address;
  if (!clientIp) {
    console.error(
      `Could not get IP address for socket ${socket.id}. Disconnecting client.`,
    );
    socket.disconnect(true);
    return;
  }
  clients.set(socket.id, { socket, ip: clientIp });
  console.log(`User connected: ${socket.id} from ${clientIp}`);

  // Handle incoming messages from clients
  socket.on("chat message", (msg) => {
    const senderId = socket.id;
    const senderInfo = clients.get(senderId);

    if (!senderInfo) {
      console.error(`Sender info not found for socket ID: ${senderId}`);
      return; // Should not happen
    }
    const senderIp = senderInfo.ip;

    console.log(`Message from ${senderId} (${senderIp}): ${msg}`);

    // Broadcast the message to all other connected clients
    // and determine if TTS should be enabled based on IP comparison
    for (const [receiverId, receiverClientInfo] of clients.entries()) {
      if (receiverId === senderId) {
        // Do not send message back to the sender itself
        continue;
      }

      const receiverIp = receiverClientInfo.ip;
      // TTS enabled if sender's IP is DIFFERENT from receiver's IP
      const ttsEnabled = senderIp !== receiverIp;

      // Send the message along with the TTS enable/disable flag
      receiverClientInfo.socket.emit("chat message", {
        message: msg,
        ttsEnabled: ttsEnabled,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    clients.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser.`);
});
