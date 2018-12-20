const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const Article = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: { //Will be user id which created article
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    __v: {
        type: Number,
        select: false
    }
});

Article.path('title').validate((title) => {
    if(validator.isAscii(title)) {
        return validator.isLength(title, { min: 1, max: 40 }) ? true : false;
    } else {
        throw new Error('Title shold use only ASCII characters');
    }
}, {
    message: 'Title entity too large or too small'
});

Article.path('content').validate((content) => {
    if(validator.isAscii(content)) {
        return validator.isLength(content, { min: 1, max: 40 }) ? true : false;
    } else {
        throw new Error('Content shold use only ASCII characters');
    }
}, {
    message: 'Content entity too large or too small'
});

module.exports = mongoose.model('Article', Article);