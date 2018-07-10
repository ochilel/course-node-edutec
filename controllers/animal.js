'use strict'

var Animal = require('../models/animal');

function getAnimals(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de animales'
    })
}

function getAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findById(animalId).exec((err, animal) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!animal) {
                res.status(404).send({
                    message: 'Animal no existe'
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
                    message: 'Error en el servidor'
                });
            } else {
                if (!animalStored) {
                    res.status(404).send({
                        message: 'No se ha guardado el animal'
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
            message: 'El nombre del animal es obligatorio'
        });
    }
}

module.exports = {
    getAnimals,
    saveAnimal,
    getAnimal
}