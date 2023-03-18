require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const { makePairsWithPunches } = require('./lib/functions');

const {
  User, PrivateMessage, Room, AllGames, Message, Setup,
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
    const userDB = await User.update({ status: 'player', roomId: id }, {
      where: { id: userId },
      returning: true,
      plain: true,
    });
    const user = {
      id: userDB[1].id,
      login: userDB[1].login,
      points: userDB[1].points,
      avatar: userDB[1].avatar,
    };
    io.emit('checkEnterToRoom', { id, user });
  });

  socket.on('disconnectRoom', async ({ id, token }) => {
    const { id: userId } = decodeToken(token);
    const user = await User.findByPk(userId);
    if (user.status === 'admin') {
      await User.update({ status: null, roomId: null, ready: false }, { where: { roomId: id } });
      await Room.destroy({ where: { id } });
      io.emit('destroyRoom', { id });
    } else if (user.status === 'player') {
      await User.update({ status: null, roomId: null, ready: false }, { where: { id: userId } });
      await Room.increment({ members: -1 }, { where: { id } });
      io.emit('playerQuitRoom', { id, userId });
    }
  });

  socket.on('sendMessage', async ({ id, token, message }) => {
    const { id: userId } = decodeToken(token);
    const messageDB = await Message.create({ roomId: id, userId, text: message });
    const user = await User.findByPk(userId);

    const messageNew = {
      id: messageDB.id,
      text: messageDB.text,
      time: messageDB.createdAt,
      user: user.login,
    };

    io.emit('newMessage', { id, messageNew });
  });

  socket.on('sendPrivateMessage', async ({ id, token, message }) => {
    const { id: senderId } = decodeToken(token);
    const messageDB = await PrivateMessage.create({ senderId, recipientId: id, text: message });
    const user = await User.findByPk(senderId);

    const messageNew = {
      id: messageDB.id,
      text: messageDB.text,
      time: messageDB.createdAt,
      user: user.login,
    };

    io.emit('newPrivateMessage', { id, senderId, messageNew });
  });

  socket.on('readyParticipants', async ({ token, roomId }) => {
    const { id: userId } = decodeToken(token);
    await User.update({ ready: true }, { where: { id: userId } });
    const usersInThisRoom = await User.findAll({ where: { roomId } });
    const everybodyReady = usersInThisRoom.every((el) => el.ready === true);
    if (usersInThisRoom.length === 2 && everybodyReady) {
      io.emit('playerReady', { roomId, userId });
      setTimeout(async () => {
        User.update({ ready: false }, { where: { roomId } });
        const usersIds = usersInThisRoom.map((el) => el.id);
        const allPunchesDB = await Setup.findAll();
        const textPunches = allPunchesDB.map((el) => el.body);
        const data = makePairsWithPunches(usersIds, textPunches);
        io.emit('everybodyReady', { roomId, data });
      }, 1500);
    } else {
      io.emit('playerReady', { roomId, userId });
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

server.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
