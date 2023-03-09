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

module.exports = {
    createItem
};