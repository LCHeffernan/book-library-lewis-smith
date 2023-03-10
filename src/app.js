const express = require('express');
const readerRouter = require('./routes/reader');
const bookRouter = require('./routes/bookRouter');
const genreRouter = require('./routes/genreRouter');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);
app.use('/books', bookRouter);
app.use('/genres', genreRouter);

module.exports = app;
