const { Reader } = require('../models');

exports.create = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newReader = await Reader.create(req.body);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   if (!name) {
  //     res.status(400).json({ error: 'a name is required.' });
  //   } else if (!email){
  //     res.status(400).json({ error: 'an email is required.'});
  //   } else if(!emailRegex.test(email)){
  //     res.status(400).json({ error: 'email should be valid.'});
  //   }
  //   res.status(201).json(newReader);
  // } catch (err) {
  //   res.status(500).json(err.message);
  // }

  res.status(201).json(newReader);
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message);
    res.status(400).json({ errors: errorMessages });
  }
};

exports.readUser = async (_, res) => {
  try {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const readerId = id;
    const reader = await Reader.findByPk(readerId);

    if (!reader) {
      res.status(404).json({ error: `The reader could not be found.` });
    }
    res.status(200).json(reader);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updatedReaderRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const updateData = {
      email: email,
    };
    const [updateRows] = await Reader.update(updateData, { where: { id } });

    if (!updateRows) {
      res.status(404).json({ error: 'The reader could not be found' });
    }

    res.status(200).json(updateRows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteReader = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Reader.destroy({ where: { id: id } });

    if (!deletedRows) {
      res.status(404).json({ error: `The reader could not be found` });
    }

    res.status(204).json(deletedRows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
