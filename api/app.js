//To set up middlewares to respond to HTTP Requests
const express = require("express");
const app = express();

//To create server
const http = require("http");
const server = http.createServer(app);

//Import env config file
const path = require("path");
require("dotenv").config({ path: ".env" });

//To enhance your API's security
const helmet = require("helmet");
app.use(helmet());

//Enabling Cross origin for all requests
const cors = require("cors");
app.use(cors({}));

// To handle HTTP request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.status(200).json({ message: `server connected  port ${PORT}` });
});

server.listen(PORT, () => {
  console.log(`server started at  ${PORT}`);
});

//Importing the socket-IO
require("./services/socket-io")(server);
