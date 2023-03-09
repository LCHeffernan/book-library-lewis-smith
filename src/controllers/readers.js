const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('./helper');

exports.create = (req, res) => { 
  createItem(res, 'reader', req.body);
};

exports.readUser = (_, res) => {
  getAllItems(res, 'reader');
};

exports.readSingleUser = (req, res) => {
  getItemById(res, 'reader', req.params.id);
};

exports.updatedReaderRecord = (req, res) => {
  updateItem(res, 'reader', req.body, req.params.id);
};

exports.deleteReader = async (req, res) => {
  deleteItem(res, 'reader', req.params.id);
};