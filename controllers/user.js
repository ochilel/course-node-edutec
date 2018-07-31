'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
var constants = require('../utils/constants').constants;

var User = require('../models/user');

function register(req, res) {
    var user = new User();
    var params = req.body;

    if (params.name && params.lastname && params.email && params.password) {

        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: constants.ERROR_IN_REQUEST
                });
            } else {
                if (!issetUser) {
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: constants.ERROR_IN_SAVE_USER
                                });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({
                                        message: constants.USER_NOT_REGISTER
                                    });
                                } else {
                                    res.status(200).send({
                                        message: constants.USER_SUCCESS_STORED,
                                        user: userStored
                                    });
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({
                        message: constants.USER_NOT_REGISTER
                    });
                }
            }
        })
    } else {
        res.status(200).send({
            message: constants.WRONG_PARAMETERS
        });
    }
}

function login(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, issetUser) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (issetUser) {
                bcrypt.compare(password, issetUser.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(issetUser)
                            });
                        } else {
                            res.status(200).send({
                                issetUser
                            });
                        }
                    } else {
                        res.status(200).send({
                            message: constants.LOGIN_FAILED
                        });
                    }
                })
            } else {
                res.status(404).send({
                    message: constants.LOGIN_FAILED
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var updateData = req.body;
    delete updateData.password;

    if (userId != req.user.sub) {
        return res.status(401).send({
            message: constants.UPDATE_USER_NOT_ALLOWED
        });
    }

    User.findByIdAndUpdate(userId, updateData, {new: true}, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: constants.USER_NOT_UPDATED
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
}

function deleteUser(req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, userRemoved) => {
        if (err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!userRemoved) {
                res.status(404).send({
                    message: constants.USER_NOT_DELETED
                });
            } else {
                res.status(200).send({
                    message: `El usuario ${userRemoved.email} se ha eliminado exitosamente`
                });
            }
        }
    });

}

function setAdminRole(req, res) {
    var userId = req.params.id;

    User.findByIdAndUpdate(userId, {role: 'ROLE_ADMIN'}, {new: true}, (err, userUpdated) => {
        if(err) {
            res.status(500).send({
                message: constants.ERROR_IN_REQUEST
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: constants.USER_NOT_UPDATED
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
}

function changePassword(req, res) {
    var params = req.body;
    if (params.email && params.password) {
        var userEmail = params.email.toLowerCase();
        var password = params.password;
        User.findOne({email: userEmail}, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: constants.ERROR_IN_REQUEST
                });
            } else {
                if (issetUser) {
                    bcrypt.hash(password, null, null, (err, hash) => {
                        var newPassword = hash;
                        User.findByIdAndUpdate(issetUser.id, {password: newPassword}, {new: true}, (err, userUpdated) => {
                            if (err) {
                                res.status(500).send({
                                    message: constants.ERROR_IN_REQUEST
                                });
                            } else {
                                if (!userUpdated) {
                                    res.status(404).send({
                                        message: constants.PASSWORD_NOT_UPDATED
                                    });
                                } else {
                                    res.status(200).send({
                                        message: constants.PASSWORD_UPDATED_SUCCESFULLY
                                    });
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({
                        message: constants.USER_NOT_EXISTS
                    });
                }
            }
        })
    } else {
        res.status(200).send({
            message: constants.WRONG_PARAMETERS
        });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    setAdminRole,
    changePassword  
}