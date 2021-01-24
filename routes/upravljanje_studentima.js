var express = require('express');
var router = express.Router();

let controller = require('../controllers/upravljanje_studentima');

router.get('/', controller.upravljanje_studentima);

module.exports = router;