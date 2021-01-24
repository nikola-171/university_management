var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_polozen_predmet_studentu');

router.post('/', controller.izbrisi_polozen_predmet_studentu);

module.exports = router;