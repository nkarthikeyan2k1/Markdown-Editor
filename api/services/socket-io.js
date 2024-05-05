/** socket-io is used to communicate with client and server */

const socketIO = require("socket.io");

module.exports = (server) => {
  //Connection setup
  const io = socketIO(server, {
    transports: ["websocket", "polling"],
    cors: {
      origin: "*",
    },
  });

  //Socket Connection
  io.on("connection", async (socket) => {
    console.log("Socket connected");

    //socket disconnection
    socket.on("disconnect", async () => {
      console.log("Socket Disconnected");
    });
  });

  // To export the socket to use in controllers
  global.socket = io;
};
