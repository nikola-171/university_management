var express = require('express');
var router = express.Router();

let controller = require('../controllers/prikaz_fakulteta');

router.get('/', controller.prikaz_fakulteta);

module.exports = router;