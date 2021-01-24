var express = require('express');
var router = express.Router();

let controller = require('../controllers/prikaz_univerziteta');

router.get('/', controller.prikaz_univerziteta);

module.exports = router;