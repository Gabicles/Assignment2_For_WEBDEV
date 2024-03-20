// Genres router
const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

router.get('/', function(req, res, next) {
  const genres = Genre.getAllGenres();
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async (req, res, next) => {
  res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.get('/edit', async (req, res, next) => {
  const genreId = req.query.id;
  const genre = Genre.getGenreById(genreId);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreId: genreId });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsertGenre(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `The genre has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/genres');
});

module.exports = router;