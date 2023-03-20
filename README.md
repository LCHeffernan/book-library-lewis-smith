## Project Title

###Book Library

### Project Description

- This project aims to create a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on a reader, author, genre, and book table in a PostgreSQL database.

- The database is contained in a Docker container using the official postgres image. The project includes: create-database and drop-database scripts (dropping only during testing); .env and .env.test files to differentiate which scripts to utilise.

- The project also includes a models directory which establishes schemas for the aforementioned tables, and utilises the Sequelize ORM to make it easier to work with relational databses through: being database agnostic; query building; data validation; and a migration system.

- The project also contains controllers relevant to each table, including a helper.js to reduce code repetition; routes to establish the HTTP method and route; an app.js to create an instance of app using express, as well as utilize both global and local middleware: global for utilising JSON format; and local to mount the controllers on a particular path. It also contains an index.js in order to establish the port number for the server, as well as a listen method to ensure the app is up and running following the start command.

- With this API, users can add, retrieve, update, and delete the reader, author, genre, and book tables and the corresponding data, using HTTP methods such as GET, PATCH, POST, DELETE.

- Integration testing is utilised via Supertest, Mocha, and Chai, which ensure that the API works as expected and prevents regression bugs.

- Overall, this project provides a robust and efficient solution for managing readers, books, genres, and authors in a PostgreSQL database through a RESTful API, with proper testing and documentation for use and maintenance.

## Installation of book library and dependencies

```
$ git clone https://github.com/lewsmit2/book-library.git
$ cd book-library
$ npm install
```

### Project Dependencies

```
// package.json
...
    "dependencies": {
        "express": "^4.18.2",
        "pg": "^8.9.0",
        "sequelize": "^6.29.0"
    }
    ...
```

### Install devDependencies

```
npx eslint --init
npx prettier --write .
npm i -D mocha chai supertest
npm i -D dotenv
npm i -D nodemon
```

// package.json
...

```
  "devDependencies": {
    "chai": "^4.3.7",
    "dotenv": "^16.0.3",
    "eslint": "^8.35.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "prettier": "2.8.4",
    "supertest": "^6.3.3"
    },
...
```

### .env Files

The following env files are necessary for informing the configuration and execution of the scripts.

```
// create a .env file with the following:
...
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=changeToAUniquePassword
PGDATABASE=book_library_dev
PGPORT=5432
...
```

```
// create a .env.test file with the following:
...
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=changeToUniquePassword
PGDATABASE=book_library_dev_test
PGPORT=5432
...
```

### Install Docker

https://docs.docker.com/get-docker/

### Create and Run postgres image

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

### Install pgAdmin4

https://www.pgadmin.org/download/

### Add New Server in pgAdmin

- Click 'Add new server',
- Hostname/address: localhost,
- User: postgres,
- Password: // password of your choice

### Tests

Following installation, ensure you cd to the book-library route, then type:

```
npm test
```

### How to use?

```
npm start
```

Following this, you can access via Postman Desktop at: http://localhost:4000/{appropriateRoute}.

### Routes Available

| reader verb | reader route                       | reason                     |
| ----------- | ---------------------------------- | -------------------------- |
| GET         | http://localhost:3000/readers      | to retrieve all readers    |
| GET         | http://localhost:3000/readers/{id} | to retrieve a reader by id |
| POST        | http://localhost:3000/readers      | to create readers          |
| PATCH       | http://localhost:3000/readers/{id} | to update readers          |
| DELETE      | http://localhost:3000/readers/{id} | to delete readers          |

| author verb | author route                       | reason                     |
| ----------- | ---------------------------------- | -------------------------- |
| GET         | http://localhost:3000/authors      | to retrieve all authors    |
| GET         | http://localhost:3000/authors/{id} | to retrieve a author by id |
| POST        | http://localhost:3000/authors      | to create authors          |
| PATCH       | http://localhost:3000/authors/{id} | to update authors          |
| DELETE      | http://localhost:3000/authors/{id} | to delete authors          |

| book verb | book route                       | reason                   |
| --------- | -------------------------------- | ------------------------ |
| GET       | http://localhost:3000/books      | to retrieve all books    |
| GET       | http://localhost:3000/books/{id} | to retrieve a book by id |
| POST      | http://localhost:3000/books      | to create books          |
| PATCH     | http://localhost:3000/books/{id} | to update books          |
| DELETE    | http://localhost:3000/books/{id} | to delete books          |

| genre verb | genre route                       | reason                    |
| ---------- | --------------------------------- | ------------------------- |
| GET        | http://localhost:3000/genres      | to retrieve all genres    |
| GET        | http://localhost:3000/genres/{id} | to retrieve a genre by id |
| POST       | http://localhost:3000/genres      | to create genres          |
| PATCH      | http://localhost:3000/genres/{id} | to update genres          |
| DELETE     | http://localhost:3000/genres/{id} | to delete genres          |
