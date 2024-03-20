const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const BookUser = require('../models/book_user');
const helpers = require('./helpers');

router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return;
  }
  res.render('users/register', { title: 'BookedIn || Registration' });
});

router.post('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return;
  }
  try {
    const user = await User.getByEmail(req.body.email);
    if (user) {
      res.render('users/register', {
        title: 'BookedIn || Registration',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: 'A user with this email already exists'
        }
      });
    } else {
      await User.add(req.body);
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'The user has been created!'
      };
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/login', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return;
  }
  res.render('users/login', { title: 'BookedIn || Login' });
});

router.post('/login', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return;
  }
  try {
    const user = await User.login(req.body);
    if (user) {
      req.session.currentUser = user;
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'You are now logged in'
      };
      res.redirect('/');
    } else {
      res.render('users/login', {
        title: 'BookedIn || Login',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: 'Wrong email and password combination or the user could not be found'
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser;
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'You are now logged out'
  };
  res.redirect('/');
});

router.get('/profile', async (req, res, next) => {
  if (helpers.isNotLoggedIn(req, res)) {
    return;
  }
  try {
    const booksUser = await BookUser.AllForUser(req.session.currentUser.email);
    const booksPromises = booksUser.map(async (bookUser) => {
      const book = await Book.get(bookUser.bookId);
      bookUser.book = book;
      return bookUser;
    });
    const booksUserWithBooks = await Promise.all(booksPromises);
    res.render('users/profile', { title: 'BookedIn || Profile', user: req.session.currentUser, booksUser: booksUserWithBooks });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
