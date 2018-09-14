const router = require('express').Router();
const Article = require('../models/Article');
const createError = require('http-errors');

router.get('/articles', (req, res, next) => {
    Article.find({})
        .populate('author')
        .exec((err, articles) => {
            if (err) {
                return next(createError());
            }

            res.json({
                articles: articles
            });
        });
});

module.exports = router;