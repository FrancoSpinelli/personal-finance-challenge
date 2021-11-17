const express = require('express');
const router = express.Router();
const path = require('path');

let apiController = require ('../controllers/apiController');

router.get('/', apiController.index);


module.exports = router;