/**
 * In this file contains all Socket client service - To communication with server side Socket
 **/

import { io } from "socket.io-client";

/*Declare the API BaseUrl*/
const APIURL = process.env.REACT_APP_SERVERURL;

//Intial socketIO declaraction
var socketIO = io(APIURL);

/**
 * This Function used To connect with Socket
 **/
const connect = () => {
  socketIO.connect();
};

/**
 * This function used To send the message
 * @data we pass the mark down texts
 **/
const sendMarkdown = (data) => {
  return socketIO.emit("send-markdown", data);
};

/**
 * This function used To get HTML Message
 **/
const getHTML = (callback) => {
  socketIO.off("receive-markdown");
  socketIO.on("receive-markdown", callback);
};

/**
 * This Function used To Disconnect Socket
 **/
const disconnect = () => {
  return socketIO.disconnect();
};

const Socket = { connect, disconnect, sendMarkdown, getHTML };

export default Socket;
