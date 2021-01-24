var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_departman');

router.post('/', controller.izbrisi_departman);

module.exports = router;