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
 * This Function used To Disconnect Socket
 **/
const disconnect = () => {
  return socketIO.disconnect();
};

const Socket = { connect, disconnect };

export default Socket;
