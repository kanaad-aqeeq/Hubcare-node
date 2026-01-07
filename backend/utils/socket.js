const { Server } = require("socket.io");

let io;
const connectedUsers = {};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);
      if (userId) delete connectedUsers[userId];
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

const getSocketInstance = () => io;
const getConnectedUsers = () => connectedUsers;

module.exports = { initializeSocket, getSocketInstance, getConnectedUsers };
