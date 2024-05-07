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

app.use(express.json()); // To accept JSON Data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

// app.get("/", (req, res) => {
//   return res.status(200).json({ message: `server connected  port ${PORT}` });
// });

// ---------------Deployment--------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend,", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.status(200).json({ message: `server connected  port ${PORT}` });
  });
}
// ---------------Deployment--------------------------

server.listen(PORT, () => {
  console.log(`server started at  ${PORT}`);
});

require("./services/socket-io")(server);
