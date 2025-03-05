const express = require('express');
const router = express.Router();
const { storeListData } = require('../controllers/pOverwriteController.js');

router.post('/list', storeListData);

module.exports = router;