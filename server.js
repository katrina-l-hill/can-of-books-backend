'use strict';

// requirements for server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { once } = require('nodemon');
const bodyParser = require('body-parser');
//uncomment if seeding of DB is needed
require('./models/book.js');



// bring in mongoose
const mongoose = require('mongoose');

// bring in a schema to interact with book.js
const Book = require('./models/book.js');

// connect Mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// implement express
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// define PORT to validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/test', (request, response) => {
  response.send('test request received')
})
app.get('/books', getBooks);
app.post('/books', postBooks);

async function getBooks(request, response, next) {
  let query = {};
  if (request.query.email) {
    query.email = request.query.email;
  }
  try {
    let results = await Book.find(query);
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks (request, response, next) {
  try {
    const newBook = await Book.create(request.body);
    response.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
};


// ERRORS
app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
