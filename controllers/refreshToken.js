const createError = require('http-errors');

module.exports.refreshToken = (req, res, next) => {
    const { body } = req;

    console.log(req);
}