const checkAuth = require('../middlewares/checkAuth');
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

//Avatar update
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.user.id + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

//user controller
const user = require('../controllers/user');

//Route for getting all users
router.get('/users', checkAuth, user.getAllUsers);

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

//Route for updating profile picture
router.post('/:id/settings/avatar', [checkAuth, upload.single('avatar')], user.avatarUpload)

module.exports = router;