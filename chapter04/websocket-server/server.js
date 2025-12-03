import { Server } from 'ws';

const WebSocketServer = new Server({
  port: 3000
});

WebSocketServer.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('Received:', msg.toString());
    if (msg.toString() === 'Hello') socket.send('World!');
  });
});
