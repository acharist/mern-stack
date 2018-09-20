const jwt = require('jsonwebtoken');
const key = require('../config/key');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, key);
        //Define a specific user
        req.user = decoded;
        next();
    } catch(err) {
        next(createError(401));
    }
}