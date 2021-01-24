var express = require('express');
var router = express.Router();

let controller = require('../controllers/admin_pocetna_strana');

router.get('/', controller.admin_pocetna_strana);

module.exports = router;