'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    image: String,
    origen: {
        country: String,
        state: String
    }
});

module.exports = mongoose.model('Animal', AnimalSchema);