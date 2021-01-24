var express = require('express');
var router = express.Router();

let controller = require('../controllers/upravljanje_univerzitetima');

router.get('/', controller.upravljanje_univerzitetima);

module.exports = router;