require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Router

const mainRouter = require('./routes/index');

// Server

const server = express();

server.use(morgan('dev'));
server.use(cors());
server.use(express.json());

// Conexión

server.use('/',mainRouter);

module.exports = server;