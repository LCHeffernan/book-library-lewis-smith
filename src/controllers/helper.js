const { Book, Reader } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
    };

    return models[model];
}

const getAllItems = async(res, model) => {
    const Model = getModel(model);

    const items = await Model.findAll();

    res.status(200).json(items);
}

const createItem = async (res, model, item) => {
    const Model = getModel(model);

    try {
        const newItem = await Model.create(item);

        res.status(201).json(newItem);
    }   catch (err) {
        const errorMessages = err.errors?.map((e) => e.message);
        res.status(400).json({ errors: errorMessages });
    }
}

const getItemById = async (res, model, id) => {
    const Model = getModel(model);
    const item = await Model.findByPk( id );

    if (!item){
        res.status(404).json(get404Error(model));
    }
    res.status(200).json(item);
}

const updateItem = async (res, model, item, id) => {
    const Model = getModel(model);

    const [itemUpdated] = await Model.update(item, { where: { id } });
    if (!itemUpdated) {
        res.status(404).json(get404Error(model));
    } else {
        const newlyUpdatedItem = await Model.findByPk(id);
        res.status(200).json(newlyUpdatedItem);
    }
}

const deleteItem = async (res, model, id) => {
    const Model = getModel(model);

    const deletedRows = await Model.destroy({ where: { id } });

    if(!deletedRows) {
        res.status(404).json(get404Error(model));
    } else {
        res.status(204).send();
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};