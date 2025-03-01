const express = require('express');
const router = express.Router();
const { storeData } = require('../controllers/pupil_edit.js');

router.post('/', storeData);

module.exports = router;