var express = require('express');
var router = express.Router();

let admin_logout = require('../controllers/admin_logout');

router.post('/', admin_logout.admin_logout);

module.exports = router;