const checkAuth = require('../middlewares/checkAuth');
const router = require('express').Router();

//user controller
const user = require('../controllers/user');

//Route for getting all users
router.get('/users', user.getAllUsers);

//Route for getting current user
router.get('/:id', user.getCurrentUser);

//Route for getting all user articles
router.get('/:id/article/articles', user.getUserArticles);

//Route for getting current article
router.get('/:id/article/:articleId', user.getCurrentUserArticle);

//Route for creating article
router.post('/:id/article', checkAuth, user.createArticle);

//Route for deleting article
router.delete('/:id/article/:articleID', checkAuth, user.deleteArticle);

module.exports = router;