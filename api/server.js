const accountsRouter = require('./accounts/accounts-router')
const express = require("express");

const server = express();

server.use(express.json());
server.use('/api/accounts',accountsRouter)

module.exports = server;
