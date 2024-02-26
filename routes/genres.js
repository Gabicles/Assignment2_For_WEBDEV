// routes/genres.js

const express = require('express');
const router = express.Router();
const Genre = require('../models/genre'); // Import Genre model

router.get('/form', async (req, res, next) => {
  try {
    // Fetch genres from the Genre model
    const genres = Genre.all;

    res.render('genres/form', { 
      title: 'BookedIn || Genres', 
      genres: genres // Pass genres to the template
    });
  } catch (err) {
    // Handle errors
    next(err);
  }
});

router.post('/upsert', async (req, res, next) => {
  // Handle post request if needed
});

// Other routes...

module.exports = router;
