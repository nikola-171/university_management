var express = require('express');
var router = express.Router();

let controller = require('../controllers/upravljanje_predmetima');

router.get('/', controller.upravljanje_predmetima);

module.exports = router;