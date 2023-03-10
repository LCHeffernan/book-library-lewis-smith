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

  Book.belongsTo(Reader);

  connection.sync({ alter: true });
  return {
    Reader,
    Book,
    Genre,
    Author,
  };
};

module.exports = setupDatabase();
