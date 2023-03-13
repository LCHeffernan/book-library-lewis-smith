module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'a title is required',
        },
        notEmpty: {
          args: [true],
          msg: 'title must not be empty',
        },
      },
    },

    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};
