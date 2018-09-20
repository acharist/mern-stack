const ObjectId = require('mongoose').Types.ObjectId;
const router = require('express').Router();
const User = require('../models/User');
const Article = require('../models/Article');
const createError = require('http-errors');
const checkAuth = require('../middlewares/checkAuth');

//Route for getting all users
router.get('/users', checkAuth, (req, res, next) => { //user/users GET
    User.find({})
        .populate('articles')
        .exec((err, users) => {
            if (err) {
                return next(createError());
            }

            res.json({
                length: users.length,
                users: users ? users : 'There is no users yet'
            });
        });
});

//Route for getting the user
router.get('/:id', (req, res, next) => { //user/id GET
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    res.json({
                        user
                    })
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
});

//USER ARTICLES ROUTING
//Route for getting user articles
router.get('/:id/article/articles', (req, res, next) => { //user/id/article/articles GET
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    res.json({
                        length: user.articles.length,
                        articles: user.articles
                    })
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
});

//Route for getting one article
router.get('/:id/article/:articleId', (req, res, next) => {
    const id = req.params.id;
    const articleID = req.params.articleId;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    Article.findById({ _id: articleID })
                        .exec((err, article) => {
                            if (article) {
                                if (err) {
                                    return next(createError());
                                }

                                res.json({
                                    article: article
                                });
                            } else {
                                return next(createError(404));
                            }

                        })
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
});

//Route for creating article
router.post('/:id/article', (req, res, next) => { ///user/id/article/ POST
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    const article = new Article({
                        title: req.body.title,
                        content: req.body.content,
                        author: user._id
                    });

                    article.save((err, article) => {
                        if (err) {
                            return next(createError());
                        }

                        user.articles.push(article);
                        user.save((err) => {
                            if (err) {
                                return next(createError());
                            }
                        })
                        //If ok
                        res.status(201).json({
                            message: 'Article successfully created'
                        });
                    });
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
});

//Route for deleting article
router.delete('/:id/article/:articleID', (req, res, next) => { //user/id/article/idt
    const id = req.params.id;
    const articleID = req.params.articleID;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    Article.findByIdAndRemove({ _id: articleID })
                        .exec((err) => {
                            if (err) {
                                return next(createError());
                            }

                            res.json({
                                message: `Article ${articleID} successfully deleted`
                            });
                        });
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
});

module.exports = router;