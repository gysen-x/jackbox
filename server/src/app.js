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

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// io.on('connection', (socket) => {
//   socket.on('joinRoom', async ({ nondecodeToken, roomId }) => {
//     socket.join(roomId);

//     const token = nondecodeToken.split(' ')[1];
//     const decoded = decodeToken(token);
//     const { id } = decoded;

//     await GameSession.create({ userId: id, roomId });

//     const room = await Room.findByPk(roomId);

//     let user;
//     if (room.members >= 8) {
//       user = await User.update({ status: 'gamer' }, { where: { id } });
//     } else {
//       user = await User.update({ status: 'watcher' }, { where: { id } });
//     }

//     socket.emit('message', { data: user });
//     // socket.broadcast.to(user.room).emit('message', { data: { user: { name: 'admin', message: 'hello' } } });
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

server.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); });
