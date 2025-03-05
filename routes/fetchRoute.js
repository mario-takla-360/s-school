const express = require('express');
const router = express.Router();
const { fetchByProperties } = require('../controllers/fetchController.js');

router.post('/', fetchByProperties);

module.exports = router;
