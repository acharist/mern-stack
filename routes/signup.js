const createError = require('http-errors');
const router = require('express').Router();
const User = require('../models/User');
const Article = require('../models/Article');
const mongoose = require('mongoose');

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, user) => {
        if (err) {
            if (err.errors.email) {
                //Check email error message
                switch (err.errors.email.message) {
                    case 'Email is incorrect':
                        next(createError(400, err.errors.email.message));
                        return;
                    case 'Entity too large or too small':
                        next(createError(413, err.errors.email.message));
                        return;
                    default:
                        next(createError(500, err.errors.email.message));
                        return;
                }
            } else if (err.errors.name) {
                switch (err.errors.name.message) {
                    case 'Entity too large or too small':
                        next(createError(413, err.errors.name.message));
                        return;
                    default:
                        next(createError(500, err.errors.name.message));
                        return;
                }
            } else if (err.errors.password) {
                next(createError(413, err.errors.name.message));
                return;
            } else {
                next(createError(500, err.errors.name.message));
                return;
            }
        }

        const article = new Article({
            title: 'Статья',
            content: 'Это простая статья',
            author: user._id
        });

        article.save((err, article) => {
            if(err) {
                next(createError(500));
            }

            user.articles.push(article);
            user.save((err) => {
                if(err) {
                    return next(createError());
                }
            })
            //If ok
            res.json({
                status: 200,
                message: 'User and article successfully created'
            });
        })

    })
});

module.exports = router;