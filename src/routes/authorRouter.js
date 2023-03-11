const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.post('/', authorController.create);

module.exports = router;
