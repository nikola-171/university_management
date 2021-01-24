var express = require('express');
var router = express.Router();

let controller = require('../controllers/registruj_administratora');

router.post('/', controller.registruj_administratora);

module.exports = router;