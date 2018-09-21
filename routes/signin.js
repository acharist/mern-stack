const createError = require('http-errors');
const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const key = require('../config/key');

router.post('/', (req, res, next) => {
    console.log(req.body.email)
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                return next(createError());
            }
            if (user) {
                if (req.body.password) {
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) { return next(createError()); }

                        if (!isMatch) {
                            return next(createError(400, 'Password is incorrect'));
                        } else {
                            //Everything ok
                            const token = jwt.sign({
                                email: user.email,
                                id: user._id
                            }, key, {
                                    expiresIn: '1h'
                                });

                            res.json({
                                message: 'Auth success',
                                token
                            });
                        }
                    });
                } else {
                    return next(createError(404, 'Password no sent'))
                }
            } else {
                return next(createError(404, 'User not found'));
            }
        });
});

module.exports = router;