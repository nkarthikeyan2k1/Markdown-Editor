const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
require("dotenv").config({ path: ".env" });
const cors = require("cors");
app.use(cors({}));
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

require("./services/socket-io")(server);
