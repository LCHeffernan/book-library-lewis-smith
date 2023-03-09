const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => await Book.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no books in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Goblet of Fire',
          author: 'JK Rowling',
          genre: 'Fantasy',
          ISBN: '93482390483',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Goblet of Fire');
        expect(response.body.author).to.equal('JK Rowling');
        expect(response.body.genre).to.equal('Fantasy');
        expect(response.body.ISBN).to.equal('93482390483');
        expect(newBookRecord.title).to.equal('Goblet of Fire');
      });

      it('errors if title or author is absent', async () => {
        const response = await request(app).post('/books').send({
          genre: 'Fantasy',
          ISBN: '93482390483',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(2);
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe('with books in the database', () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Philosopher's Stone",
          author: 'JK Rowling',
          genre: 'Fantasy',
          ISBN: '12345563',
        }),
        Book.create({
          title: 'Chamber of Secrets',
          author: 'JK Rowling',
          genre: 'Fantasy',
          ISBN: '12756563',
        }),
        Book.create({
          title: 'Prisoner of Azkhaban',
          author: 'JK Rowling',
          genre: 'Fantasy',
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
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
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
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
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
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({
            title: 'Deathly Hallows',
            ISBN: '12348765',
            genre: 'Fanta',
            author: 'Limp Bizkit',
          });
        const updatedBookRecords = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecords.title).to.equal('Deathly Hallows');
        expect(updatedBookRecords.ISBN).to.equal('12348765');
        expect(updatedBookRecords.genre).to.equal('Fanta');
        expect(updatedBookRecords.author).to.equal('Limp Bizkit');
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ title: 'dddddddd' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found');
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
        expect(response.body.error).to.equal('The book could not be found');
      });
    });
  });
});
