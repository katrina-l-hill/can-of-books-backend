'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract schema property from the mongoose object
const { Schema } = mongoose;

// create a book schema, define how our object will be structured
const bookSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    email: {type: String, required: true}
  });

const BookModel = mongoose.model('book', bookSchema);

module.exports = BookModel;