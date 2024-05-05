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
  return (socketIO = io(APIURL, {
    auth: { token: localStorage.getItem("token") },
  }));
};

/**
 * This function used To send the message
 * @data we pass message,recipients,participants,content_type
 **/
const sendMarkdown = (data) => {
  return socketIO.emit("send-markdown", data);
};

/**
 * This function used To get Chat Message
 * @callback we receive message,created_by,viewed_by,content_type,role,recipients, and participants in Object format
 **/
const getHTML = (callback) => {
  socketIO.off("receive-markdown");
  // socketIO.on("receive-markdow", callback);
  socketIO.on("receive-markdow", (convertedHtml) => {
    console.log("chchc", convertedHtml);
  });
};

/**
 * This Function used To Disconnect Socket
 **/
const disconnect = () => {
  return socketIO.disconnect();
};

const Socket = { connect, disconnect, sendMarkdown, getHTML };

export default Socket;
