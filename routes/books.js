// books.js

const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Comment = require('../models/comment');
const BookUser = require('../models/book_user');
const Author = require('../models/author'); // Assuming you have an Author model
const Genre = require('../models/genre'); // Assuming you have a Genre model

// GET all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.all(); // Using the all() method to fetch all books
    res.render('books/index', { title: 'BookedIn || Books', books: books });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET a specific book
router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    bookId: req.params.id,
    statuses: BookUser.statuses,
    currentUser: req.session.currentUser // Pass current user to the template
  };

  try {
    // Fetch book details
    const book = await Book.get(req.params.id);
    templateVars.book = book;

    if (!book) {
      // Handle book not found error (e.g., redirect or display error message)
      return next(); // Pass control to error handler middleware (if applicable)
    }

    // Fetch additional data (comments, authors, genre) based on book
    templateVars.comments = await Comment.getCommentsForBook(req.params.id); // Fix function name
    if (book.authorIds) {
      templateVars['authors'] = await Promise.all(book.authorIds.map(Author.get)); // Fetch authors efficiently using Promise.all
    }
    if (book.genreId) {
      templateVars['genre'] = await Genre.get(book.genreId);
    }

    res.render('books/show', templateVars);
  } catch (error) {
    // Handle unexpected errors during data fetching
    console.error(error);
    next(error); // Pass error to error handler middleware
  }
});

module.exports = router;

