const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const CommentController = require('../controllers/comments.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de comentarios');
  });
router.post('/',Authorization , CommentController.createComment)
router.get('/', CommentController.getComments)
router.get('/:id', CommentController.getCommentById)
router.put('/:id',Authorization , CommentController.blockComment)
router.put('/remove/:id',Authorization, CommentController.removeComment)

module.exports = router;



