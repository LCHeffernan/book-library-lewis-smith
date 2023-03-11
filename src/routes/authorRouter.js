const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.post('/', authorController.create);

router.get('/', authorController.readAll);

module.exports = router;
