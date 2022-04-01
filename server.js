'use strict';

// requirements for server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const req = require('express/lib/request');
// const res = require('express/lib/response');
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
// must have this to receive json from a request
app.use(express.json());
app.use(bodyParser.json());

// define PORT to validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/test', (request, response) => {
  response.send('test request received')
})
app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook);

async function getBooks(request, response, next) {
  let query = {};
  if (request.query.email) {
    query.email = request.query.email;
  }
  try {
    let results = await Book.find(query);
    console.log(results);
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(request, response, next) {
  try {
    console.log(request.body);
    // request.body contains title, desc, author, email
    let createdBook = await Book.create(request.body);
    const newBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
};

async function deleteBook(request, response, next) {
  // REST verb DELETE // Mongoose Model.findByIdAndDelete()
  let id = request.params.id;
  try {
    console.log(id);
    await Book.findByIdAndDelete(id);
    response.send('book deleted');
  } catch (error) {
    next(error);
  }
}

async function putBook(request, response, next) {
  console.log(request.body);
  let id = request.params.id; 
  try {
    let upDatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true, overwrite: true });
    response.status(200).send(upDatedBook);
  } catch (error) {
    next(error);
  }
}

// ERRORS
app.get('*', (request, response, next) => {
  response.status(404).send('Server cannot find requested resource');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
