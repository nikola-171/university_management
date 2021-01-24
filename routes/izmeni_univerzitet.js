var express = require('express');
var router = express.Router();

let controller = require('../controllers/izmeni_univerzitet');

router.post('/', controller.izmeni_univerzitet);

module.exports = router;