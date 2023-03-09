const { Book } = require('../models');
const { getItemById, createItem } = require('./helper');

exports.create = async (req, res) => {
  createItem(res, 'book', req.body);
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
  getItemById(res, 'book', req.params.id);
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
      res.status(404).json({ error: 'The book could not be found.' });
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
      res.status(404).json({ error: 'The book could not be found.' });
    }

    res.status(204).json(deletedRows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
