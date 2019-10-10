const router = require('express').Router();
const refreshTokens = require('../controllers/refreshTokens');

router.post('/', refreshTokens.refreshTokens);

module.exports = router