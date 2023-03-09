module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'a name is required.',
      },
        notEmpty: {
          args: [true],
          msg: 'name must not be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'a valid email address is required',
        },
        notNull: {
          args: [true],
          msg: 'email must not be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'a password is required.',
      },
      fewerThan8Characters(value) {
        if(value.length < 8)
          throw new Error('Password needs to be longer than 8 characters');
      },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};