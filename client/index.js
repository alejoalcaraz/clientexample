const WebSocket = require('ws')
var conn = new WebSocket('wss://clientexample.onrender.com');
conn.onopen = function(e) {
    console.log("Connection established!");
};
setInterval(() => {
  conn.send('Hello server!');
}, 1000);
conn.onmessage = function(e) {
    console.log(e.data);
};
conn.onclose = function(e) {
    console.log(e.code);
    console.log(e.reason);
};              
conn.onerror = function(e) {
    console.log(e);
};      