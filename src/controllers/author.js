const { createItem, getAllItems, getItemById } = require('./helper');

exports.create = (req, res) => {
  createItem(res, 'author', req.body);
};

exports.readAll = (_, res) => {
  getAllItems(res, 'author');
};

exports.getItemById = (req, res) => {
  getItemById(res, 'author', req.params.id);
};
