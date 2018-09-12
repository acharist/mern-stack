const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.json({
        status: 'ok'
    });
    
});

module.exports = router;