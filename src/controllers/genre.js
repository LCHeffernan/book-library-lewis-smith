const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helper');

const create = (req, res) => {
  createItem(res, 'genre', req.body);
};

const readGenre = (_, res) => {
  getAllItems(res, 'genre');
};

const readSingleGenre = (req, res) => {
  getItemById(res, 'genre', req.params.id);
};

const updateGenre = (req, res) => {
  updateItem(res, 'genre', req.body, req.params.id);
};

const deleteGenre = (req, res) => {
  deleteItem(res, 'genre', req.params.id);
};

module.exports = {
  create,
  readGenre,
  readSingleGenre,
  updateGenre,
  deleteGenre,
};
