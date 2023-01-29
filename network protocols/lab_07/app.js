'use strict';
var formatMessage = require('./helper/formatDate');
var {
    getActiveUser,
    exitRoom,
    newUser,
    getInvRoomUsers
} = require('./helper/userHelper')

const connect = require("connect");
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer);

app.use(serveStatic("public"));

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = newUser(socket.id, username, room);
  
      socket.join(user.room);
  
      socket.emit('message', formatMessage("WebCage", 'Messages are limited to this room! '));
  
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage("WebCage", `${user.username} has joined the room`)
        );
  
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getInvRoomUsers(user.room)
      });
    });
  
    socket.on('chatMessage', msg => {
      const user = getActiveUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  
    socket.on('disconnect', () => {
      const user = exitRoom(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage("WebCage", `${user.username} has left the room`)
        );
  
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getInvRoomUsers(user.room)
        });
      }
    });
  });
  
httpServer.listen(3000, function () {
 console.log('Serwer HTTP działa na pocie 3000');
});
