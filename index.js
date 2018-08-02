'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo');

app.listen(port);

console.log('Edutec Backend is running')