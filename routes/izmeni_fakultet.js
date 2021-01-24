var express = require('express');
var router = express.Router();

let controller = require('../controllers/izmeni_fakultet');

router.get('/', controller.izmeni_fakultet);

module.exports = router;