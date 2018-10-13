const router = require('express').Router();
const refreshToken = require('../controllers/refreshToken');

router.post('/', refreshToken.refreshToken);

module.exports = router