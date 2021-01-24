var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_predmet_sa_departmana');

router.post('/', controller.izbrisi_predmet_sa_departmana);

module.exports = router;