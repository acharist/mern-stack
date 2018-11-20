const createError = require('http-errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const key = require('../config/key');

module.exports.signIn = (req, res, next) => {
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
                            const accessToken = jwt.sign({
                                email: user.email,
                                id: user._id
                            }, key, {
                                expiresIn: '10s'
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
                                //Get only necessary properties from user
                                const articles = user.articles.length ? articles : 'empty' 
                                const { avatarUrl, _id, name, email } = user;
                                res.json({
                                    data: { avatarUrl, articles, _id, name, email },
                                    accessToken,
                                    refreshToken
                                });
                            });
                        }
                    });
                } else {
                    return next(createError(404, 'Password no sent'))
                }
            } else {
                return next(createError(404, 'Email not found'));
            }
        });
}