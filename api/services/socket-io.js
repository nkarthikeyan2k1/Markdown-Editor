/** socket-io is used to communicate with client and server */

const socketIO = require("socket.io");

const MarkdownEditor = require("./MarkdownEditor");

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
    console.log("Socket connected", socket.id);

    /**
     * To Send Message
     * @message we send encrypt message,content_type,recipients and id and participant id in array format
     **/
    socket.on("send-markdown", async (message = null) => {
      // io.to(socket.id).emit("receive-markdown", message); // to the particular user
      // io.emit("receive-markdown", message);//for all the socket connected user
      const HTML = await MarkdownEditor.convertMarkdowntoHTML(message);
      socket.emit("receive-markdown", HTML); // to who intial this connect
    });

    //socket disconnection
    socket.on("disconnect", async () => {
      console.log("Socket Disconnected");
    });
  });

  // To export the socket to use in controllers
  global.socket = io;
};
