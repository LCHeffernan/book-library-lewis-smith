const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helper');

exports.create = (req, res) => {
  createItem(res, 'genre', req.body);
};

exports.readGenre = (_, res) => {
  getAllItems(res, 'genre');
};

exports.readSingleGenre = (req, res) => {
  getItemById(res, 'genre', req.params.id);
};

exports.updateGenre = (req, res) => {
  updateItem(res, 'genre', req.body, req.params.id);
};

exports.deleteGenre = (req, res) => {
  deleteItem(res, 'genre', req.params.id);
};
