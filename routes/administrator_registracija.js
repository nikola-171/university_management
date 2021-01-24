var express = require('express');
var router = express.Router();

let controller = require('../controllers/administrator_registracija');

router.get('/', controller.administrator_registracija);

module.exports = router;