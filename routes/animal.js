'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.post('/animal', AnimalController.saveAnimal);
api.post('/animals');
api.put('/animal/:id');
api.delete('/animal/:id');
api.post('/animal-upload-image/:id');

module.exports = api;
