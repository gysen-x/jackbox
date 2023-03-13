require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);

const authRoute = require('./routes/authRoute');

const app = express();

const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  name: 'cookie',
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
};

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions(sessionConfig));

app.use((req, res, next) => {
  console.log('\n\x1b[33m', 'req.session.user :', req.session?.user);
  next();
});

app.use('/auth', authRoute);

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); });
