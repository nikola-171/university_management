var express = require('express');
var router = express.Router();

let controller = require('../controllers/upravljanje_fakultetima');

router.get('/', controller.upravljanje_fakultetima);

module.exports = router;