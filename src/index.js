require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Router

const mainRouter = require('./routes/index');

// Server

const server = express();
server.disable('x-powered-by')

server.use(morgan('dev'));
server.use(cors({
  origin: (origin,callback)=>{
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000'
    ]
    if(ACCEPTED_ORIGINS.includes(origin)){
      return callback(null,true)
    }
    if(!origin){
      return callback(null,true)
    }

    return callback(new Error('Not allowed by Cors'));
  }
}));
server.use(express.json());

// Conexión

server.use('/',mainRouter);

module.exports = server;