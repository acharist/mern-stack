const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');
const Article = require('../models/Article');
const createError = require('http-errors');

module.exports.getAllUsers = (req, res, next) => {
    User.find({})
        .select('-password')
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
}

module.exports.getCurrentUser = (req, res, next) => {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        User.findById({ _id: id })
            .populate('articles')
            .exec((err, user) => {
                if (user) {
                    if (err) {
                        return next(createError());
                    }

                    const { avatarUrl, _id, articles, name, surname, email, age, city,  } = user;
                    res.json({
                        data: { avatarUrl, articles, _id, name, email, surname, age, city },
                    })
                } else {
                    return next(createError(404, 'No such user'));
                }
            })
    } else {
        return next(createError(404));
    }
}

module.exports.getUserArticles = (req, res, next) => {
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
        return next(createError(404)); //Or 400 Id is incorrect
    }
}

module.exports.getCurrentUserArticle = (req, res, next) => {
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
            });
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
}

module.exports.createArticle = (req, res, next) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        if (id == req.user.id) { //If it's tokens owner
            User.findById({ _id: id })
                .exec((err, user) => {
                    if (err) {
                        return next(createError());
                    }

                    if (user) {
                        const article = new Article({
                            title: req.body.title,
                            content: req.body.content,
                            author: user._id
                        });

                        article.save((err, article) => {
                            if (err) {
                                if(err.name === 'ValidationError') {
                                    const sendErr = [];
                                    for(key in err.errors) {
                                        let { name, message, value, reason } = err.errors[key];
                                        switch(key) {
                                            case 'title':
                                                sendErr.push({ name, message, value, reason });
                                                break;
                                            case 'content':
                                                sendErr.push({ name, message, value, reason });
                                                break;
                                            default:
                                                break;    
                                        }
                                    }
                                    
                                     return res.status(400).json({
                                        data: sendErr
                                    });
                                } else {
                                    return next(createError());
                                }
                            }
                            user.articles.push(article);
                            user.save((err) => {
                                if (err) {
                                    return next(createError());
                                }
                                
                                //If ok
                                res.status(201).json({
                                    message: 'Article successfully created'
                                });
                            });
                        });
                    } else {
                        return next(createError(404, 'No such user'));
                    }
                })
        } else {
            return next(createError(401));
        }
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
}

module.exports.deleteArticle = (req, res, next) => {
    const id = req.params.id;
    const articleID = req.params.articleID;

    if (ObjectId.isValid(id)) {
        if (id === req.user.id) {
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
                });
        } else {
            return next(createError(401));
        }
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
}

module.exports.avatarUpload = (req, res, next) => {
    const id = req.params.id;
    const maxFileSize = 1024 * 1024 * 2; 

    if(ObjectId.isValid(id)) {
        if(id === req.user.id) {
            if(req.file) {
                if(req.file.size > maxFileSize) {
                    return next(createError(400, 'File size is too big'))
                } else {
                    User.findById({ _id: id })
                        .exec((err, user) => {
                                if(err) {
                                    return next(createError(500));
                                }

                                user.avatarUrl = `http://localhost:5000/api/uploads/${id}.jpg`;
                                user.save((err) => {
                                    if(err) {
                                        return next(createError(500));
                                    }
                
                                    res.status(200).json({
                                        message: 'Avatar successfully uploaded'
                                    });
                                })
                            })
                }
            } else {
                return next(createError(400, 'Request object doesn\'t contain any file '))
            }
        } else {
            return next(createError(401));
        }
    } else {
        return next(createError(400, 'ID is incorrect'));
    }
}