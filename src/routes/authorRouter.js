const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.post('/', authorController.create);

router.get('/', authorController.readAll);

router.get('/:id', authorController.getAuthorById);

router.patch('/:id', authorController.updateAuthorById);

router.delete('/:id', authorController.deleteAuthorById);

module.exports = router;
