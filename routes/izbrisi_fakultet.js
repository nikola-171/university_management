var express = require('express');
var router = express.Router();

let controller = require('../controllers/izbrisi_fakultet');

router.post('/', controller.izbrisi_fakultet);

module.exports = router;