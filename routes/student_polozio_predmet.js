var express = require('express');
var router = express.Router();

let controller = require('../controllers/student_polozio_predmet');

router.get('/', controller.student_polozio_predmet);

module.exports = router;