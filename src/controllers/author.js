const { createItem } = require('./helper');

exports.create = (req, res) => {
  createItem(res, 'author', req.body);
};
