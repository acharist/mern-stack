const router = require('express').Router();
const signUp = require('../controllers/signup');

router.post('/', signUp.signUp);

module.exports = router;