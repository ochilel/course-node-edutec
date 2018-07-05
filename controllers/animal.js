'use strict'

var Animal = require('../models/animal');

function getAnimals(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de animales'
    })
}

module.exports = {
    getAnimals
}