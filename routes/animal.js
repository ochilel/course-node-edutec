'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/animals'});

var api = express.Router();

api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.post('/animal', AnimalController.saveAnimal);
api.post('/animals');
api.put('/animal/:id', AnimalController.updateAnimal);
api.delete('/animal/:id', AnimalController.deleteAnimal);
api.post('/animal-upload-image/:id', [md_upload], AnimalController.uploadImage);

module.exports = api;
