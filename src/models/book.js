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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'an author is required',
        },
        notEmpty: {
          args: [true],
          msg: 'author must not be empty,',
        },
      },
    },
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};
