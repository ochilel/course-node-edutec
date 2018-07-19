'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var animalRoutes = require('./routes/animal');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());

app.use('/api', animalRoutes);

app.get ('/test', (req, res) => {
    res.status(200).send({
        message: 'mi primer'
    });
});

module.exports = app;