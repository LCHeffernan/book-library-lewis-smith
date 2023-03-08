const Sequelize = require('sequelize');
const ReaderModel = require('./readers');
const BookModel = require('./book.js');

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

  Book.belongsTo(Reader);

  connection.sync({ alter: true });
  return {
    Reader,
    Book,
  };
};

module.exports = setupDatabase();
