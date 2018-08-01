'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds231961.mlab.com:31961/edutec-nodejs-zoo')
    .then(() => {
        console.log('La conexion a mongo a sido exitosa');
        app.listen(port, () => {
            console.log('El servidor local de node y express esta corriendo');
        });
    })
    .catch(err => console.log(err));