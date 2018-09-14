module.exports = (req, res, next) => {
    res.sendError = (status, message) => {
        return res.json({
            status,
            message
        });
    }

    next();
}