var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novog_profesora');

router.post('/', controller.dodaj_novog_profesora);

module.exports = router;