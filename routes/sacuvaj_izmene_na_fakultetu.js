var express = require('express');
var router = express.Router();

let controller = require('../controllers/sacuvaj_izmene_na_fakultetu');

router.post('/', controller.sacuvaj_izmene_na_fakultetu);

module.exports = router;