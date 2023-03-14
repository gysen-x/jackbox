require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRoute = require('./routes/authRoute');

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

app.listen(PORT, () => { console.log(`server started on http://localhost:${PORT}`); });
