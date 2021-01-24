var express = require('express');
var router = express.Router();

let controller = require('../controllers/check_student_credentials');

router.post('/', controller.check_student_credentials);

module.exports = router;