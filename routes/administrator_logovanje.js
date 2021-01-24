var express = require('express');
var router = express.Router();

let controller = require('../controllers/administrator_logovanje');

router.get('/', controller.administrator_logovanje);

module.exports = router;