var express = require('express');
var router = express.Router();

let controller = require('../controllers/azuriraj_status_studenata');

router.post('/', controller.azuriraj_status_studenata);

module.exports = router;