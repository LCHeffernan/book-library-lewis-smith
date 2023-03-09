const {
  getItemById,
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require('./helper');

exports.create = async (req, res) => {
  createItem(res, 'book', req.body);
};

exports.readBook = async (_, res) => {
  getAllItems(res, 'book');
};

exports.readSingleBook = async (req, res) => {
  getItemById(res, 'book', req.params.id);
};

exports.updateBookRecord = async (req, res) => {
  updateItem(res, 'book', req.body, req.params.id);
};

exports.deleteBook = async (req, res) => {
  deleteItem(res, 'book', req.params.id);
};
