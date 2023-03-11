const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.post('/', authorController.create);

router.get('/', authorController.readAll);

router.get('/:id', authorController.getItemById);

module.exports = router;
