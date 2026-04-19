const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory within src
app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages from clients
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    // Broadcast the message to all connected clients, including the sender
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser.`);
});
