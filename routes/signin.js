const router = require('express').Router();
const signIn = require('../controllers/signin');

router.post('/', signIn.signIn);

module.exports = router;