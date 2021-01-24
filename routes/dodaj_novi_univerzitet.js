var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novi_univerzitet');

router.post('/', controller.dodaj_novi_univerzitet);

module.exports = router;
