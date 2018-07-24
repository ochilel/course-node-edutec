'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/prueba', UserController.prueba);
api.post('/register', UserController.register);
api.post('/login', UserController.login);

module.exports = api;