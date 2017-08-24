const http = require('http');
const express = require('express');
const app = express();

let port = process.env.PORT || 8000;

const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port);
console.log('listening on:', port);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', client => {
  client.on('subscribeToTimer', interval => {
    console.log('client is listening to timer with interval', interval);
    setInterval(() => {
      client.emit('timer', new Date().toString());
    }, interval);
  });
});
