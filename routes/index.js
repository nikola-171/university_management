var express = require('express');
var router = express.Router();

let index = require('../controllers/index');

router.get('/', index.index);

module.exports = router;
