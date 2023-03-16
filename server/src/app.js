require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const {
  User, GameSession, Room, AllGames,
} = require('../db/models');

const { decodeToken } = require('./controllers/lib/jwt');

const authRoute = require('./routes/authRoute');
const gameRoute = require('./routes/gameRoute');
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');

const app = express();

const server = http.createServer(app);

const io = new Server(
  server,
  {
    cors: {
      origin: 'http://localhost:4000',
      methods: ['GET', 'POST'],
    },
  },
);

io.on('connection', (socket) => {
  console.log('законектились');
  socket.on('addRoom', async () => {
    const rooms = await Room.findAll({ include: { model: AllGames }, raw: true, nest: true });
    const roomsWithGames = rooms.map((el) => (el.password ? (
      {
        id: el.id,
        name: el.name,
        isPassword: true,
        members: el.members,
        gameName: el.AllGame.name,
        maxPlayers: el.AllGame.maxPlayers,
      }) : {
      id: el.id,
      name: el.name,
      isPassword: false,
      members: el.members,
      gameName: el.AllGame.name,
      maxPlayers: el.AllGame.maxPlayers,
    }));

    io.emit('updateRooms', roomsWithGames);
  });

  socket.on('enterToRoom', async ({ id, token }) => {
    const { id: userId } = decodeToken(token);
    await Room.increment({ members: 1 }, { where: { id } });
    await User.update({ status: 'player', roomId: id }, { where: { id: userId } });
    io.emit('checkEnterToRoom', { id });
  });

  socket.on('disconnectRoom', async ({ id, token }) => {
    const { id: userId } = decodeToken(token);
    const user = await User.findByPk(userId);
    if (user.status === 'admin') {
      await User.update({ status: null, roomId: null }, { where: { roomId: id } });
      await Room.destroy({ where: { id } });
      io.emit('destroyRoom', { id });
    } else if (user.status === 'player') {
      await User.update({ status: null, roomId: null }, { where: { id: userId } });
      await Room.increment({ members: -1 }, { where: { id } });
      io.emit('playerQuitRoom', { id });
    }
  });

  io.on('disconnect', () => {
    console.log('disconnect');
  });
});

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
app.use('/users', userRoute);

server.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); });
