var express = require('express');
var router = express.Router();

let controller = require('../controllers/promeni_univerzitet');

router.get('/', controller.promeni_univerzitet);

module.exports = router;