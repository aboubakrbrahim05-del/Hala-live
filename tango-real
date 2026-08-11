const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let rooms = {}; // roomId -> { users: [], type: 'live'|'room15' }

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  socket.on('join-room', ({ roomId, userName, type }) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = { users: [], type };
    rooms[roomId].users.push({ id: socket.id, name: userName });
    
    socket.to(roomId).emit('user-joined', { id: socket.id, name: userName });
    io.to(socket.id).emit('all-users', rooms[roomId].users.filter(u => u.id !== socket.id));
    
    console.log(`${userName} joined ${roomId} (${type})`);
  });

  socket.on('signal', ({ to, from, data }) => {
    io.to(to).emit('signal', { from, data });
  });

  socket.on('send-gift', ({ roomId, gift, from }) => {
    // Gift with real coin logic would check DB here
    io.to(roomId).emit('gift-received', { gift, from, roomId });
  });

  socket.on('chat-msg', ({ roomId, msg, from }) => {
    io.to(roomId).emit('chat-msg', { msg, from });
  });

  socket.on('disconnect', () => {
    for (let roomId in rooms) {
      rooms[roomId].users = rooms[roomId].users.filter(u => u.id !== socket.id);
      io.to(roomId).emit('user-left', socket.id);
      if (rooms[roomId].users.length === 0) delete rooms[roomId];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`TANGO LIVE V6 REAL running on http://localhost:${PORT}`));
