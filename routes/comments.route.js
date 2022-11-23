const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/comments.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de comentarios');
  });
router.post('/', CommentController.createComment)
router.get('/', CommentController.getComments)
router.get('/:id', CommentController.getCommentById)
router.delete('/:id', CommentController.removeComment)

module.exports = router;



