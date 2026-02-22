const express = require('express');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server); // amader banano server ke socket.io diye wrap kore dilam jate socket.io server ready hoye jai fole amra socket.io er features use korte pari.

// socket.io er connection event handle kora hocche
io.on('connection', (socket) => {  //socket mean client 
  console.log('a user connected', socket.id); // jokhon kono client connect hobe tokhon console e dekhabe je kon user connect hoyeche tar id diye. socket.id diye amra connected user er unique id pabo.

  socket.on('chatMessage', (message) => {
    //console.log('message received:', message);
    io.emit('backmsg', message); // jokhon kono client theke message receive hobe tokhon oi message ta sob client ke pathiye dibe. io.emit diye amra sob client ke message pathate pari.
  });
});


app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});



server.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}`);
});