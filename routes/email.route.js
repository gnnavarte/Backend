const express = require('express')
const router = express.Router()
const Authorization = require('../auth/authorization');
const EmailController = require('../controllers/email.controller');

router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de correos electrónicos');
  });
router.post('/', EmailController.sendEmail)

module.exports = router;