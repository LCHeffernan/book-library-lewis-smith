const { Book } = require('../models');

exports.create = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

  res.status(201).json(newBook);
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.readBook = async (_, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = id;
    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ error: 'The book could not be found.' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateBookRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ISBN, genre, author } = req.body;
    const updateData = {
      title: title,
      ISBN: ISBN,
      genre: genre,
      author: author,
    };

    const [updateRows] = await Book.update(updateData, { where: { id } });

    if (!updateRows) {
      res.status(404).json({ error: 'The book could not be found' });
    }

    res.status(200).json(updateRows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Book.destroy({ where: { id: id } });

    if (!deletedRows) {
      res.status(404).json({ error: 'The book could not be found' });
    }

    res.status(204).json(deletedRows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
