var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_profesora_sa_predmeta');

router.post('/', controller.izbrisi_profesora_sa_predmeta);

module.exports = router;