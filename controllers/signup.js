const createError = require('http-errors');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const key = require('../config/key');

module.exports.signUp = (req, res, next) => {
    console.log(req.body)

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function (err, user) {
        if (err) {
            if (err.name === 'MongoError') {
                if (err.code === 11000) {
                    return next(createError(422, 'Such email already exists'));
                } else {
                    return next(createError(500, err.message));
                }
            } else {

                if (err.errors.email) {
                    //Check email error message
                    switch (err.errors.email.message) {
                        case 'Entity too large or too small':
                            next(createError(413, 'Email length is too large or too small'));
                            return;
                        default:
                            next(createError(400, err.errors.email.message));
                            return;
                    }
                } else if (err.errors.name) {
                    switch (err.errors.name.message) {
                        case 'Entity too large or too small':
                            next(createError(413, err.errors.name.message));
                            return;
                        default:
                            next(createError(400, err.errors.name.message));
                            return;
                    }
                } else if (err.errors.password) {
                    switch (err.errors.password.message) {
                        case 'Entity too large or too small':
                            next(createError(413, err.errors.password.message));
                            return;
                        default:
                            next(createError(400, err.errors.password.message));
                            return;
                    }
                } else {
                    //default
                    next(createError(500, err.errors.name.message));
                    return;
                }

            }
        }

        const accessToken = jwt.sign({
            email: user.email,
            id: user._id
        }, key, {
            expiresIn: '15m'
        });
    
        const refreshToken = jwt.sign({
            email: user.email,
            id: user._id
        }, key, {
            expiresIn: '60d'
        });

        user.refreshToken = refreshToken
        user.save((err) => {
            if(err) {
                return next(createError());
            }

            res.json({
                message: 'User successfully created',
                accessToken,
                refreshToken
            });
        });

    });
}
