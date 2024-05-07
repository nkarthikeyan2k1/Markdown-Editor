/** socket-io is used to communicate with client and server */

const socketIO = require("socket.io");

const MarkdownEditor = require("./MarkdownEditor");

module.exports = (server) => {
  //Connection setup
  const io = socketIO(server, {
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });

  //Socket Connection
  io.on("connection", async (socket) => {
    console.log("Socket connected");

    /**
     * To Send markdown
     *
     **/
    socket.on("send-markdown", async (markdown = null) => {
      const HTML = await MarkdownEditor.convertMarkdowntoHTML(markdown);
      socket.emit("receive-markdown", HTML);
    });

    //socket disconnection
    socket.on("disconnect", async () => {
      console.log("Socket Disconnected");
    });
  });

  // To export the socket to use in controllers
  global.socket = io;
};
