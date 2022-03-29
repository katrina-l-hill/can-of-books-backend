'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book.js');
mongoose.connect(process.env.DB_URL);

async function books(res, req, next) {
    await Book.create({
        title: '',
        description: '',
        status: '',
        email: ''
    });
    await Book.create({
        title: '',
        description: '',
        status: '',
        email: ''
    });


// remember to hang up the connection with mongoose
mongoose.disconnect();
}

books();
