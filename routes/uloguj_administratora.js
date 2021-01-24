var express = require('express');
var router = express.Router();

let controller = require('../controllers/uloguj_administratora');

router.post('/', controller.uloguj_administratora);

module.exports = router;