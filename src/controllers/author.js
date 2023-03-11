const { createItem, getAllItems } = require('./helper');

exports.create = (req, res) => {
  createItem(res, 'author', req.body);
};

exports.readAll = (_, res) => {
  getAllItems(res, 'author');
};
