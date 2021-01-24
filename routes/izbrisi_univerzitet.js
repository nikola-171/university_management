var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_univerzitet');

router.post('/', controller.izbrisi_univerzitet);

module.exports = router;