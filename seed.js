'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

async function seed() {
    console.log("seeding");
    await Book.create({
        title: 'History of the Peloponnesian War',
        description: 'Its about history, war, and the Peloponnesians',
        author: 'Thucydides',
        email: 'hgwells@aol.net'
    });
    await Book.create({
        title: 'War of the Worlds',
        description: 'There are worlds, and oh boy...',
        author: "H.G. Wells",
        email: 'hgwells@aol.net'
    });
    await Book.create({
        title: 'War with the Mutant Spider Ants (Choose Your Own Adventure(R))',
        description: 'Strange creaters in the bayous of the Florida Everglades',
        author: "Ed Pack",
        email: 'hgwells@aol.net'
    });
    await Book.create({
        title: 'Dawn and the School Spirit War (The Baby-Sitters Club #84)',
        description: 'Teenage girl with school spirit are at war with babysitters',
        author: "Ann Martin",
        email: 'hgwells@aol.net'
    });


// remember to hang up the connection with mongoose
mongoose.disconnect();
}

seed();
