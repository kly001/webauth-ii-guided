const session = require('express-session');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const sessionOptions = {
  name: "boogie",
  secret: "damianisthesecret",
  cookie: {
    maxAge: 1000*60*60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
