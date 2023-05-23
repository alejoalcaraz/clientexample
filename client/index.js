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
    });
    logger.write(content);

    var i = 1;
    function myLoop() {
      setTimeout(function () {

        const path = './results.txt';

        if (fs.existsSync(path)) {
          console.log("File exists");
          try {
            const data = fs.readFileSync(path, 'utf8');
            ws.send(data);
          } catch (err) {
            console.error(err);
          }
          try {
            fs.unlinkSync('results.txt');
          
            console.log("Delete File successfully.");
          } catch (error) {
            console.log(error);
          }
          return;
        }
        else {
          console.log("File does not exist")
        }

        i++;
        if (i > 0) {
          myLoop();
        }
      }, 3000)
    };
    myLoop();



  }
  else if(msg.toString().startsWith("Ejecutar")) {
    var logger = fs.createWriteStream('ejecutar.txt', {
      flags: 'a'
    });
    logger.write("Ejecutar");
  };
});

