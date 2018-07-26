'use strict'

exports.isAdmin = function(req, res, next) {
    var role = req.user.role;
    if (role != 'ROLE_ADMIN') {
        return res.status(403).send({
            message: 'No cuenta con permiso para acceder a esta area'
        });
    }

    next();
}; 