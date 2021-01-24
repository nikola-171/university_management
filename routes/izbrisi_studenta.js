var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_studenta');

router.post('/', controller.izbrisi_studenta);

module.exports = router;