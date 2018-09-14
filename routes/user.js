const ObjectId = require('mongoose').Types.ObjectId;
const router = require('express').Router();
const User = require('../models/User');
const Article = require('../models/Article');
const createError = require('http-errors');

router.get('/users', (req, res, next) => {
    User.find({})
        .populate('articles')
        .select('-password -__v -articles.__v')
        .exec((err, users) => {
            if(users) {
                if (err) {
                    return next(createError());
                }
    
                res.json({
                    users: users
                });
            } else {
                return next(createError(404, 'Пользователей нет'));
            }
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .select('-password -__v')
            .exec((err, user) => {
                if(user) {
                    if (err) {
                        return next(createError());
                    }
    
                    res.json({
                        user
                    })
                } else {
                    return next(createError(404, 'Такого пользователя нет'));
                }
            })
    } else {
        return next(createError(400, 'Некорректный ID'));
    }
})

module.exports = router;