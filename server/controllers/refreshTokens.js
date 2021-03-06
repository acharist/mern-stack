const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');
require('dotenv').config();

module.exports.refreshTokens = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const currentTime = new Date().getTime() / 1000;
    if(tokenHeader) {
        const pureToken = tokenHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(pureToken, process.env.SECRET_KEY);
            if(decodedToken.exp > currentTime) {
                if(ObjectId.isValid(decodedToken.id)) {
                    //there is  error
                    User.findById({_id: decodedToken.id}, function(err, user) {
                        if(err) {
                            return next(createError());
                        }
                        
                        if(pureToken === user.refreshToken) {
                            const newAccessToken = jwt.sign({
                                email: user.email,
                                id: user._id
                            }, process.env.SECRET_KEY, {
                                expiresIn: '30m'
                            });
                            const newRefreshToken = jwt.sign({
                                email: user.email,
                                id: user._id
                            }, process.env.SECRET_KEY, {
                                expiresIn: '60d'
                            });

                            user.refreshToken = newRefreshToken;
                            user.save((err) => {
                                if(err) {
                                    return next(createError());
                                }
                    
                                res.json({
                                    accessToken: newAccessToken,
                                    refreshToken: newRefreshToken
                                });
                            });
                        } else {
                            //Tokens doesn't match
                            return next(createError(401));
                        }
                    });
                } else {
                    //User id in token is incorrect
                    return next(createError(404));
                }
            } else {
                //Token expired
                return next(createError(401));
            }
        } catch(err) {
            //Invalid token
            return next(createError(401, err.message));
        }
    }
    
}