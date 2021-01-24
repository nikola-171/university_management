var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novog_studenta');

router.post('/', controller.dodaj_novog_studenta);

module.exports = router;