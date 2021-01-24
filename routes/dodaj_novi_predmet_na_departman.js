var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novi_predmet_na_departman');

router.post('/', controller.dodaj_novi_predmet_na_departman);

module.exports = router;