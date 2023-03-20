const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('./helper');

const create = (req, res) => {
  createItem(res, 'reader', req.body);
};

const readUser = (_, res) => {
  getAllItems(res, 'reader');
};

const readSingleUser = (req, res) => {
  getItemById(res, 'reader', req.params.id);
};

const updatedReaderRecord = (req, res) => {
  updateItem(res, 'reader', req.body, req.params.id);
};

const deleteReader = async (req, res) => {
  deleteItem(res, 'reader', req.params.id);
};

module.exports = {
  create,
  readUser,
  readSingleUser,
  updatedReaderRecord,
  deleteReader,
};
