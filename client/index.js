
import WebSocket from 'ws';
const serverAddress = 'wss://aia-remote-websocket-server.glitch.me/';
import FileSaver from 'file-saver';
import fs from 'fs';

import pkg from 'file-saver';
const { saveAs } = pkg;



const ws = new WebSocket(serverAddress, {
  headers: {
    "user-agent": "Mozilla"
  }
});

ws.on('open', function () {
  ws.send("Hola  carebola");
});

ws.on('message', function (msg) {
  console.log("Received msg from the server: " + msg);
  if (msg.toString().startsWith("Parametros")) {
    var array = msg.toString().split(":");
    var array2 = array[1].split(",");
    var param1 = array2[0];
    var param2 = array2[1];
    var param3 = array2[2];
    console.log(param3);
    const content = param1 + "\n" + param2 + "\n" + param3;

    

    var logger = fs.createWriteStream('params.txt', {
      flags: 'a' 
    })
    logger.write(content) 
    // var blob = new Blob([content], {
    //   type: "text/plain;charset=utf-8",
    // });
    // saveAs(blob, "params.txt");
    // console.log("guardado");
  }
});