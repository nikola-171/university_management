var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novog_studenta_polozio_predmet');

router.post('/', controller.dodaj_novog_studenta_polozio_predmet);

module.exports = router;