const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readers');

router.post('/', readerController.create);

router.get('/', readerController.readUser);

router.get('/:id', readerController.readSingleUser);

router.patch('/:id', readerController.updatedReaderRecord);

router.delete('/:id', readerController.deleteReader);

module.exports = router;
