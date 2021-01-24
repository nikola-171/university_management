var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novi_predmet');

router.post('/', controller.dodaj_novi_predmet);

module.exports = router;