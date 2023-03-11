const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
} = require('./helper');

exports.create = (req, res) => {
  createItem(res, 'author', req.body);
};

exports.readAll = (_, res) => {
  getAllItems(res, 'author');
};

exports.getItemById = (req, res) => {
  getItemById(res, 'author', req.params.id);
};

exports.updateItemById = (req, res) => {
  updateItem(res, 'author', req.body, req.params.id);
};
