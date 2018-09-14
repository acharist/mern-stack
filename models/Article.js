const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Article = new Schema({
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    __v: {
        type: Number,
        select: false
    }
});

module.exports = mongoose.model('Article', Article);