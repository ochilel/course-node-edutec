'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds231961.mlab.com:31961/edutec-nodejs-zoo');

app.listen(port);

console.log('Edutec Backend is running')