var express = require('express');
var router = express.Router();

let controller = require('../controllers/prikaz_studenata');

router.get('/', controller.prikaz_studenata);

module.exports = router;