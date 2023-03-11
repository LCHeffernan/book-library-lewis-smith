const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe('/authors', () => {
  before(async () => await Author.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe('with no authors in the database', () => {
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app).post('/authors').send({
          author: 'JK Rowling',
        });

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal('JK Rowling');
        expect(newAuthorRecord.author).to.equal('JK Rowling');
      });
      it('cannot create an author is no author is sent', async () => {
        const response = await request(app).post('/authors').send({});

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });

      it('cannot create an author that is not unique', async () => {
        const response = await request(app).post('/authors').send({
          author: 'JK Rowling',
        });
        const response2 = await request(app).post('/authors').send({
          author: 'JK Rowling',
        });

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        const newAuthorRecord2 = await Author.findByPk(response2.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response2.status).to.equal(400);

        expect(response.body.errors).to.equal(undefined);
        expect(response2.body.errors.length).to.equal(1);

        expect(newAuthorRecord.author).to.equal('JK Rowling');
        expect(newAuthorRecord2).to.equal(null);
      });
    });
  });
});
