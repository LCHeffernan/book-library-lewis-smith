module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'a name is required.',
      },
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'an email is required.',
      },
      notEmpty: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'a password is required.',
      },
      validate: {
        len: {
          args: [8, 30],
          msg: 'password must be between 8 and 30 characters long.',
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};

// Make sure the controller knows how to handle the different error messages the model might throw.

// Don't forget to write tests that support this functionality
