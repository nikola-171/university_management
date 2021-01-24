var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_profesora_predmetu');

router.get('/', controller.dodaj_profesora_predmetu);

module.exports = router;