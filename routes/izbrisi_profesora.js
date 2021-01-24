var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_profesora');

router.post('/', controller.izbrisi_profesora);

module.exports = router;