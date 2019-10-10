const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //Define a specific user
        req.user = decoded;
        next();
    } catch(err) {
        next(createError(401));
    }
}