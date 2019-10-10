const createError = require('http-errors');

module.exports = (req, res, next) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
    allowedMethods.indexOf(req.method) !== -1 ? next() : next(createError(405));
}