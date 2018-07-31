'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

var api = express.Router();

api.post('/register', UserController.register);
api.post('/login', UserController.login);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.delete('/delete-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.deleteUser);
api.put('/set-admin-role/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.setAdminRole);
api.put('/change-password', UserController.changePassword);

module.exports = api;