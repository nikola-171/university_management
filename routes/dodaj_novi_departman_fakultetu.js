var express = require('express');
var router = express.Router();

let controller = require('../controllers/dodaj_novi_departman_fakultetu');

router.post('/', controller.dodaj_novi_departman_fakultetu);

module.exports = router;