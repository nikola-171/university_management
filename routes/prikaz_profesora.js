var express = require('express');
var router = express.Router();

let controller = require('../controllers/prikaz_profesora');

router.get('/', controller.prikaz_profesora);

module.exports = router;