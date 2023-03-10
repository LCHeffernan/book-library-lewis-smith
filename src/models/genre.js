module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'a genre is required',
        },
        notEmpty: {
          args: [true],
          msg: 'genre must not be empty',
        },
      },
    },
  };

  const genreModel = connection.define('Genre', schema);
  return genreModel;
};
