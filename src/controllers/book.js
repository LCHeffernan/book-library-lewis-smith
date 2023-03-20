const {
  getItemById,
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

const create = async (req, res) => {
  createItem(res, 'book', req.body);
};

const readBook = async (_, res) => {
  getAllItems(res, 'book');
};

const readSingleBook = async (req, res) => {
  getItemById(res, 'book', req.params.id);
};

const updateBookRecord = async (req, res) => {
  updateItem(res, 'book', req.body, req.params.id);
};

const deleteBook = async (req, res) => {
  deleteItem(res, 'book', req.params.id);
};

module.exports = {
  create,
  readBook,
  readSingleBook,
  updateBookRecord,
  deleteBook,
};
