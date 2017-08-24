const http = require('http');
const express = require('express');
const app = express();

// Setting port to either port set by Heroku or 8000
let port = process.env.PORT || 8000;

//Passing http server instanse to listen method
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// Making the server listen to port
server.listen(port);
console.log('listening on:', port);

// Setting the view engine to EJS (embedded Javascript Template)
app.set('view engine', 'ejs');
// Setting the home page route
app.get('/', (req, res) => {
  res.render('index');
});

// Opening up a web socket to transmit time
io.on('connection', client => {
  client.on('subscribeToTimer', interval => {
    console.log('client is listening to timer with interval', interval);
    setInterval(() => {
      client.emit('timer', new Date().toString());
    }, interval);
  });
});
