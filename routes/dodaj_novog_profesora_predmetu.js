var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novog_profesora_predmetu');

router.post('/', controller.dodaj_novog_profesora_predmetu);

module.exports = router;