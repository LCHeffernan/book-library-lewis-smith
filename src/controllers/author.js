const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helper');

const create = (req, res) => {
  createItem(res, 'author', req.body);
};

const readAll = (_, res) => {
  getAllItems(res, 'author');
};

const getAuthorById = (req, res) => {
  getItemById(res, 'author', req.params.id);
};

const updateAuthorById = (req, res) => {
  updateItem(res, 'author', req.body, req.params.id);
};

const deleteAuthorById = (req, res) => {
  deleteItem(res, 'author', req.params.id);
};

module.exports = {
  create,
  readAll,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
