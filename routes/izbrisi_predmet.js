var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_predmet');

router.post('/', controller.izbrisi_predmet);

module.exports = router;