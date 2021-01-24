var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novi_fakultet');

router.post('/', controller.dodaj_novi_fakultet);

module.exports = router;