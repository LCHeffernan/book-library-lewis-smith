const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe('/genres', () => {
  before(async () => await Genre.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no genres in the database', () => {
    describe('POST /genres', () => {
      it('creates a new genre in the database', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'Fantasy',
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal('Fantasy');
        expect(newGenreRecord.genre).to.equal('Fantasy');
      });

      it('cannot create a genre is no genre is sent', async () => {
        const response = await request(app).post('/genres').send({});

        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newGenreRecord).to.equal(null);
      });

      it('cannot create a genre that is not unique', async () => {
        const response = await request(app)
          .post('/genres')
          .send({ genre: 'Fantasy' });
        const response2 = await request(app)
          .post('/genres')
          .send({ genre: 'Fantasy' });

        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });
        const newGenreRecord2 = await Genre.findByPk(response2.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response2.status).to.equal(400);

        expect(response.body.errors).to.equal(undefined);
        expect(response2.body.errors.length).to.equal(1);

        expect(newGenreRecord.genre).to.equal('Fantasy');
        expect(newGenreRecord2).to.equal(null);
      });
    });
  });

  describe('with records in the database', () => {
    let genres;

    beforeEach(async () => {
      await Genre.destroy({ where: {} });

      genres = await Promise.all([
        Genre.create({
          genre: 'Fantasy',
        }),
        Genre.create({
          genre: 'Science Fiction',
        }),
        Genre.create({
          genre: 'Horror',
        }),
      ]);
    });

    describe('GET /genres', () => {
      it('gets all genre records', async () => {
        const response = await request(app).get('/genres');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((a) => a.id === genre.id);

          expect(genre.genre).to.equal(expected.genre);
        });
      });
    });

    describe('GET /genres/:id', () => {
      it('gets a genre by id', async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genres/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).get('/genres/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });

    describe('PATCH /genres/:id', () => {
      it('updates a genre by id', async () => {
        const genre = genres[0];
        const response = await request(app)
          .patch(`/genres/${genre.id}`)
          .send({ genre: 'Comedy' });
        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedGenreRecord.genre).to.equal('Comedy');
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app)
          .patch('/genres/12345')
          .send({ genre: 'roieroei' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });

    describe('DELETE /genres/:id', () => {
      it('deletes a genre by id', async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genres/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).delete('/genres/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });
  });
});
