const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre');

router.post('/', genreController.create);

router.get('/', genreController.readGenre);

router.get('/:id', genreController.readSingleGenre);

router.patch('/:id', genreController.updateGenre);

module.exports = router;
