const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {

  let author;
  let genre;

  before(async () => {
    await Book.sequelize.sync({ force: true })
  
    author = await request(app).post('/authors').send({ author: 'JK Rowling' });
    genre = await request(app).post('/genres').send({ genre: 'Fantasy' });
    author = await request(app).post('/authors').send({ author: 'Fyodor Dostojevski' });
    genre = await request(app).post('/genres').send({ genre: 'Existentialism' });
    author = await request(app).post('/authors').send({ author: 'Jordan Peterson' });
    genre = await request(app).post('/genres').send({ genre: 'Psychology' });
});

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no books in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Goblet of Fire',
          authorId: author.body.id,
          genreId: genre.body.id,
          ISBN: '93482390483',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Goblet of Fire');
        expect(newBookRecord.authorId).to.equal(author.body.id);
        expect(response.body.ISBN).to.equal('93482390483');
        expect(newBookRecord.title).to.equal('Goblet of Fire');
      });

      it('errors if title, author, or genre are absent', async () => {
        const response = await request(app).post('/books').send({

          ISBN: '93482390483',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(3);
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe('with books in the database', () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Goblet of Fire",
          authorId: 1,
          genreId: 1,
          ISBN: '93482390483',
        }),
        Book.create({
          title: 'Crime and Punishment',
          authorId: 2,
          genreId: 2,
          ISBN: '12756563',
        }),
        Book.create({
          title: '12 Rules for Life',
          authorId: 3,
          genreId: 3,
          ISBN: '23920433',
        }),
      ]);
    });
  
    describe('GET /books', () => {
      it('gets all books records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);
 
          expect(book.title).to.equal(expected.title);
          expect(book.authorId).to.equal(expected.authorId);
          expect(book.genreId).to.equal(expected.genreId);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe('GET /book/:id', () => {
      it('gets books record by id', async () => {
        const book = books[0];

        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.authorId).to.equal(book.authorId);
        expect(response.body.genreId).to.equal(book.genreId);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('PATCH /books/:id', async () => {
      it('updates book details by id', async () => {
        const book = books[0];
        const response = await request(app).patch(`/books/${book.id}`).send({
          title: 'Deathly Hallows',
          ISBN: '12348765',
          genreId: 1,
          authorId: 1,
        });
        const updatedBookRecords = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecords.title).to.equal(response.body.title);
        expect(updatedBookRecords.ISBN).to.equal(response.body.ISBN);
        expect(updatedBookRecords.authorId).to.equal(response.body.authorId);
        expect(updatedBookRecords.genreId).to.equal(response.body.genreId);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ title: 'dddddddd' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('DELETE /books/:id', async () => {
      it('deletes a book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});
