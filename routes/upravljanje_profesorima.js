var express = require('express');
var router = express.Router();

let controller = require('../controllers/upravljanje_profesorima');

router.get('/', controller.upravljanje_profesorima);

module.exports = router;