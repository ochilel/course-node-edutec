'use strict'

// modulos
var fs = require('fs');
var path = require('path');
var constants = require('../utils/constants').constants;

var Animal = require('../models/animal');

function getAnimals(req, res) {
    Animal.find({}).exec((err, animals) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!animals) {
                res.status(404).send({
                    message: constants.EMPTY_ANIMALS
                });
            } else {
                res.status(200).send({
                    animals
                });
            }
        }
    });
}

function getAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findById(animalId).exec((err, animal) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!animal) {
                res.status(404).send({
                    message: constants.ANIMAL_NOT_EXISTS
                });
            } else {
                res.status(200).send({
                    animal
                });
            }
        }
    });
}

function saveAnimal(req, res) {
    var animal = new Animal();
    var params = req.body;

    if (params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.origen.country = params.country;
        animal.origen.state = params.state;
        animal.image = null;

        animal.save((err, animalStored) => {
            if (err) {
                res.status(500).send({
                    message: constants.ERROR_IN_REQUEST
                });
            } else {
                if (!animalStored) {
                    res.status(404).send({
                        message: constants.ANIMAL_NOT_SAVED
                    });
                } else {
                    res.status(200).send({
                        animal: animalStored
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: constants.ANIMAL_NAME_IS_REQUIRED
        });
    }
}

function updateAnimal(req, res) {
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, {new: true}, (err, animalUpdated) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!animalUpdated) {
                res.status(404).send({
                    message: constants.ANIMAL_NOT_UPDATED
                });
            } else {
                res.status(200).send({
                    animal: animalUpdated
                });
            }
        }
    });
}

function deleteAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!animalRemoved) {
                res.status(404).send({
                    message: constants.ANIMAL_NOT_FOUND
                });
            } else {
                res.status(200).send({
                    animal: animalRemoved
                });
            }
        }
    });
}

function uploadImage(req, res) {
    var animalId = req.params.id;
    var file_name = 'No imagen';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];
        console.log('split-----    ' + file_split);

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg') {
            Animal.findByIdAndUpdate(animalId, {image: file_name}, {new: true}, (err, animalUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: constants.ERROR_IN_REQUEST
                    });
                } else {
                    if (!animalUpdated) {
                        res.status(404).send({
                            message: constants.ANIMAL_NOT_UPDATED
                        });
                    } else {
                        res.status(200).send({
                            animal: animalUpdated,
                            image: file_name
                        });
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(200).send({
                        message: constants.IMAGE_EXTENSION_NOT_VALID
                    });
                } else {
                    res.status(200).send({
                        message: constants.IMAGE_EXTENSION_NOT_VALID
                    });
                }
            });
        }
    } else {
        res.status(200).send({
            message: constants.REQUIRED_FILE
        });
    }
}

module.exports = {
    getAnimals,
    saveAnimal,
    getAnimal,
    updateAnimal,
    deleteAnimal,
    uploadImage
}