require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const { Op } = require('sequelize');
const { makePairsWithPunches } = require('./lib/functions');

const {
  User, PrivateMessage, Room, AllGames, Message, Setup, AnswersAndPairs, BestPunch, Friendship,
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
      origin: 'http://localhost:4100',
      methods: ['GET', 'POST'],
    },
  },
);

io.on('connection', (socket) => {
  console.log('законектились');

  socket.on('sendPrivateMessage', async ({ id, token, message }) => {
    const { id: senderId } = decodeToken(token);
    const messageDB = await PrivateMessage.create({ senderId, recipientId: id, text: message });
    const user = await User.findByPk(senderId);

    const messageNew = {
      id: messageDB.id,
      text: messageDB.text,
      time: messageDB.createdAt,
      user: {
        login: user.login,
        id: user.id,
      },
    };

    io.emit('newPrivateMessage', { id, senderId, messageNew });
  });

  socket.on('deleteFriend', async ({ id: ourId, tokenJWT }) => {
    const { id: frId } = decodeToken(tokenJWT);
    io.emit('checkDeleteFriend', { ourId, frId });
  });

  socket.on('addFriend', async ({ friendId, token }) => {
    const { id: ourId } = decodeToken(token);
    await Friendship.bulkCreate([
      { userId1: ourId, userId2: friendId },
      { userId1: friendId, userId2: ourId },
    ]);
    io.emit('checkAddFriend', { ourId, friendId });
  });

  socket.on('addRoom', async () => {
    const rooms = await Room.findAll({ include: { model: AllGames }, raw: true, nest: true });
    const roomsWithGames = rooms.map((el) => (el.password ? (
      {
        id: el.id,
        name: el.name,
        isPassword: true,
        members: el.members,
        gameName: el.AllGame.name,
        maxPlayers: el.maxPlayers,
      }) : {
      id: el.id,
      name: el.name,
      isPassword: false,
      members: el.members,
      gameName: el.AllGame.name,
      maxPlayers: el.maxPlayers,
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
      await User.update({
        status: null, roomId: null, ready: false, pointsInGame: 0, votes: 0,
      }, { where: { roomId: id } });
      await Room.destroy({ where: { id } });
      io.emit('destroyRoom', { id });
    } else if (user.status === 'player') {
      await User.update({
        status: null, roomId: null, ready: false, pointsInGame: 0, votes: 0,
      }, { where: { id: userId } });
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
      user: {
        login: user.login,
        id: user.id,
      },
    };

    io.emit('newMessage', { id, messageNew });
  });

  socket.on('readyParticipants', async ({ token, roomId }) => {
    const { id: userId } = decodeToken(token);
    await User.update({ ready: true }, { where: { id: userId } });
    const usersInThisRoom = await User.findAll({ where: { roomId } });
    const everybodyReady = usersInThisRoom.every((el) => el.ready === true);
    const { round, maxPlayers } = await Room.findOne({ where: { id: roomId } });
    if (usersInThisRoom.length === maxPlayers && everybodyReady) {
      io.emit('playerReady', { roomId, userId });
      setTimeout(async () => {
        User.update({ ready: false }, { where: { roomId } });
        const usersIds = usersInThisRoom.map((el) => el.id);
        const allPunchesDB = await Setup.findAll();
        const textPunches = allPunchesDB.map((el) => el.body);
        const data = makePairsWithPunches(usersIds, textPunches);
        const dataForDB = data.map((el) => ({
          roomId,
          playerId1: el.pairs[0],
          playerId2: el.pairs[1],
          setup: el.punch,
        }));
        await AnswersAndPairs.bulkCreate(dataForDB);
        io.emit('everybodyReady', { roomId, data, round });
      }, 1500);
    } else {
      io.emit('playerReady', { roomId, userId });
    }
  });

  socket.on('pushAnswer', async ({ punch, token, roomId }) => {
    const { id: userId } = decodeToken(token);
    const ourPair = await AnswersAndPairs.findOne({
      where: {
        roomId,
        [Op.or]: [
          { playerId1: userId },
          { playerId2: userId },
        ],
      },
    });
    if (userId === ourPair.playerId1) {
      await AnswersAndPairs.update(
        { punchPlayer1: punch },
        { where: { roomId, playerId1: userId } },
      );
    } else {
      await AnswersAndPairs.update(
        { punchPlayer2: punch },
        { where: { roomId, playerId2: userId } },
      );
    }

    const allPairs = await AnswersAndPairs.findAll({ where: { roomId }, order: ['id'] });
    const isEverybodyAnswers = allPairs.every((el) => el.punchPlayer1 && el.punchPlayer2);
    if (isEverybodyAnswers) {
      const fisrtVote = allPairs[0];
      const firstVoteData = {
        setup: fisrtVote.setup,
        first: {
          id: fisrtVote.playerId1,
          punch: fisrtVote.punchPlayer1,
        },
        second: {
          id: fisrtVote.playerId2,
          punch: fisrtVote.punchPlayer2,
        },
      };
      io.emit('everybodyAnswers', { roomId, firstVoteData });
    }
  });

  socket.on('currentParticipantVote', async ({ token, roomId, id }) => {
    const { id: userId } = decodeToken(token);
    const votedUser = await User.increment({ votes: 1 }, { where: { id: userId } });
    const votedRoom = await Room.increment({ votes: 1 }, { where: { id: roomId } });
    if (id) {
      await User.increment({ pointsInGame: 100 }, { where: { id } });
      const allPairsWOVotes = await AnswersAndPairs.findAll({ where: { roomId } });
      const currentPair = allPairsWOVotes.find((el) => el.playerId1 === id || el.playerId2 === id);
      if (id === currentPair.playerId1) {
        await AnswersAndPairs.increment({ votesFor1: 1 }, { where: { id: currentPair.id } });
      } else {
        await AnswersAndPairs.increment({ votesFor2: 1 }, { where: { id: currentPair.id } });
      }
    }

    const allPairs = await AnswersAndPairs.findAll({ where: { roomId }, order: ['id'] });

    if (votedUser[0][0][0].votes < allPairs.length) {
      const nextPair = allPairs[votedUser[0][0][0].votes];
      const nextVote = {
        setup: nextPair.setup,
        first: {
          id: nextPair.playerId1,
          punch: nextPair.punchPlayer1,
        },
        second: {
          id: nextPair.playerId2,
          punch: nextPair.punchPlayer2,
        },
      };

      io.emit('nextVote', { roomId, nextVote, userId });
    } else if ((votedRoom[0][0][0].members * allPairs.length) === votedRoom[0][0][0].votes) {
      let maxVotes = 0;
      for (let i = 0; i < allPairs.length; i += 1) {
        if (allPairs[i].votesFor1 > maxVotes) {
          maxVotes = allPairs[i].votesFor1;
        } else if (allPairs[i].votesFor2 > maxVotes) {
          maxVotes = allPairs[i].votesFor2;
        }
      }

      const bestPunch = {
        roomId,
      };

      for (let i = 0; i < allPairs.length; i += 1) {
        if (allPairs[i].votesFor1 === maxVotes || allPairs[i].votesFor2 === maxVotes) {
          if (allPairs[i].votesFor1 === maxVotes) {
            bestPunch.userId = allPairs[i].playerId1;
            bestPunch.punch = allPairs[i].punchPlayer1;
            bestPunch.votes = maxVotes;
            bestPunch.setup = allPairs[i].setup;
            break;
          }
        }
      }

      if (votedRoom[0][0][0].round < 3) {
        if (votedRoom[0][0][0].round === 1) {
          await BestPunch.create(bestPunch);
        } else {
          const oldBestPunch = await BestPunch.findOne({ where: { roomId } });
          if (maxVotes > oldBestPunch.votes) {
            await BestPunch.update(bestPunch, { where: { roomId } });
          }
        }

        await AnswersAndPairs.destroy({ where: { roomId } });
        const refreshParticipants = await User.findAll({
          where: { roomId },
          attributes: ['id', 'login', 'avatar', 'ready', 'pointsInGame'],
        });
        const room = await Room.increment({ round: 1 }, { where: { id: roomId } });
        await Room.update({ votes: 0 }, { where: { id: roomId } });
        await User.update({ votes: 0 }, { where: { roomId } });
        const { round } = room[0][0][0];

        const usersIds = refreshParticipants.map((el) => el.id);
        const allPunchesDB = await Setup.findAll();
        const textPunches = allPunchesDB.map((el) => el.body);
        const data = makePairsWithPunches(usersIds, textPunches);
        const dataForDB = data.map((el) => ({
          roomId,
          playerId1: el.pairs[0],
          playerId2: el.pairs[1],
          setup: el.punch,
        }));
        await AnswersAndPairs.bulkCreate(dataForDB);

        io.emit('everybodyVote', {
          roomId, refreshParticipants, round, data,
        });
      } else {
        const oldBestPunch = await BestPunch.findOne({ where: { roomId } });
        if (maxVotes > oldBestPunch.votes) {
          await BestPunch.update(bestPunch, { where: { roomId } });
        }

        await AnswersAndPairs.destroy({ where: { roomId } });
        await Room.update({ round: 1, votes: 0 }, { where: { id: roomId } });
        const finalBestPunchDB = await BestPunch.findOne({
          where: { roomId },
          include: { model: User },
        });
        const finalBestPunch = {
          user: finalBestPunchDB.User.login,
          punch: finalBestPunchDB.punch,
          votes: finalBestPunchDB.votes,
          setup: finalBestPunchDB.setup,
        };
        const participants = await User.findAll({
          where: { roomId },
          attributes: ['id', 'login', 'avatar', 'ready', 'pointsInGame'],
        });
        io.emit('gameFinished', { roomId, participants, finalBestPunch });
        await User.update({ pointsInGame: 0, votes: 0 }, { where: { roomId } });
        await BestPunch.destroy({ where: { roomId } });
      }
    } else {
      io.emit('waitingOtherVotes', { id: roomId, userId });
    }
  });

  io.on('disconnect', () => {
    console.log('disconnect');
  });
});

const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: 'http://localhost:4100',
  credentials: true,
}));

app.use('/public', express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/games', gameRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/users', userRoute);

server.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
