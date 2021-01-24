var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_departman');

router.get('/', controller.dodaj_departman);

module.exports = router;