const { Book, Reader, Genre, Author } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
  };

  return models[model];
};

const removePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password;
  }

  return obj;
};

const getAllBooks = async (res, model) =>{
  const Model = getModel(model);
  const item = await Model.findAll({ include: Book });

  res.status(200).json(item);
};

const getAllItems = async (res, model) => {
  const Model = getModel(model);

  const items = await Model.findAll();
  const itemsWithoutPassword = items.map((item) =>
    removePassword(item.dataValues)
  );

  res.status(200).json(itemsWithoutPassword);
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);
  try {
    const newItem = await Model.create(item);
    const newItemWithoutPassword = await removePassword(newItem.get());
    res.status(201).json(newItemWithoutPassword);
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

const getItemById = async (res, model, id) => {
  const Model = getModel(model);
  let item;
 
  try{
    if(Model === 'Book') {
      item = await Model.findByPk(id, { include: ['Genre', 'Author'],
     });
    } else if(Model === 'Reader'){
      item = await Model.findByPk(id)
    }
    
    else {
       item = await Model.findByPk(id, {
        attributes: { exclude: 'password'},
       });
    }
    if( item == null ) {
      res.status(404).json({ error: `The ${model} could not be found.` });
    }
    res.status(200).json(item);
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

const updateItem = async (res, model, item, id) => {
  const Model = getModel(model);

  const [itemUpdated] = await Model.update(item, { where: { id } });
  if (!itemUpdated) {
    res.status(404).json(get404Error(model));
  } else {
    const newlyUpdatedItem = await Model.findByPk(id);
    const itemWithoutPassword = await removePassword(newlyUpdatedItem.get());
    res.status(200).json(itemWithoutPassword);
  }
};

const deleteItem = async (res, model, id) => {
  const Model = getModel(model);

  const deletedRows = await Model.destroy({ where: { id } });

  if (!deletedRows) {
    res.status(404).json(get404Error(model));
  } else {
    res.status(204).send();
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getAllBooks
};
