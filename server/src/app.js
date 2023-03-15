require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const { User, GameSession, Room } = require('../db/models');

const { decodeToken } = require('./controllers/lib/jwt');

const authRoute = require('./routes/authRoute');
const gameRoute = require('./routes/gameRoute');
const roomRoute = require('./routes/roomRoute');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// io.on('connection', (socket) => {
//   socket.on('addRoom', async () => {
//     const rooms = await Room.findAll();

//     socket.emit('updateRooms', rooms);
//   });

//   io.on('disconnect', () => {
//     console.log('disconnect');
//   });
// });

const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/games', gameRoute);
app.use('/rooms', roomRoute);

server.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); });
