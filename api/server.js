const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const UsersRouter = require("./users/users-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/users", UsersRouter);

//SANITY CHECK ENDPOINT

server.get('/', (req, res) => {
  res.send(`API Up`);
});

//ERROR HANDLING MIDDLEWARE

server.use((err, req, res, next )=>{
  res.status(500).json({message: err.message});
});

module.exports = server;
