const Sequelize = require('sequelize');
const ReaderModel = require('./readers');
const BookModel = require('./book.js');
const GenreModel = require('./genre.js');
const AuthorModel = require('./author.js');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);

  Book.belongsTo(Author, {
    as: "author",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'book must have an author' },
        notEmpty: { msg: 'book must have an author' },
      },
    },
  });

  Book.belongsTo(Genre, {
    as: "genre",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'book must have a genre' },
        notEmpty: { msg: 'book must have a genre' },
      },
    },
  });

  connection.sync({ alter: true });
  return {
    Reader,
    Book,
    Genre,
    Author,
  };
};

module.exports = setupDatabase();
