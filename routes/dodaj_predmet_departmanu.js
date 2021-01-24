var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_predmet_departmanu');

router.get('/', controller.dodaj_predmet_departmanu);

module.exports = router;