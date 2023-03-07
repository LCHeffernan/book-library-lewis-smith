const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.post("/", bookController.create);

router.get("/", bookController.readBook);

router.get("/:id", bookController.readSingleBook);

router.patch("/:id", bookController.updateBookRecord);

module.exports = router;