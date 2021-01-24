var express = require('express');
var router = express.Router();

let controller = require('../controllers/student_slusa_predmet');

router.get('/', controller.student_slusa_predmet);

module.exports = router;