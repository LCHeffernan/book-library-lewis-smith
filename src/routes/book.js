const express = require('express');
const router = express.Router();
const bookController = require('../controllers/readers');

router.post('/', bookController.create);

router.get('/', bookController.readUser);

router.get('/:id', bookController.readSingleUser);

router.patch('/:id', bookController.updatedReaderRecord);

router.delete('/:id', bookController.deleteReader);

module.exports = router;