'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');
mongoose.connect(process.env.DB_URL);

async function books() {
    console.log("seeding");
    await Book.create({
        title: 'War and Peace',
        description: 'Its about war, and about peace',
        status: true,
        email: 'tolstoysghost@gmail.com'
    });
    await Book.create({
        title: 'War of the Worlds',
        description: 'There are worlds, and oh boy...',
        status: true,
        email: 'hgwells@aol.net'
    });
    await Book.create({
        title: 'War with the Mutant Spider Ants (Choose Your Own Adventure(R))',
        description: 'Strange creaters in the bayous of the Florida Everglades',
        status: true,
        email: 'edpack@yahoo.com'
    });


// remember to hang up the connection with mongoose
mongoose.disconnect();
}

books();
