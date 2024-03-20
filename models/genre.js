// Genre model!!
const genres = {
  1: { name: "Science Fiction" },
  2: { name: "Fantasy" },
  3: { name: "Romance" },
  4: { name: "Mystery" },
  5: { name: "Horror" }
};

exports.getAllGenres = () => {
  return Object.values(genres);
}

exports.getGenreById = (id) => {
  return genres[id];
}

exports.updateGenre = (genre) => {
  genres[genre.id] = genre;
}

exports.upsertGenre = (genre) => {
  if (genre.id) {
    exports.updateGenre(genre);
  } else {
    const id = Object.keys(genres).length + 1;
    genre.id = id.toString();
    genres[id] = genre;
  }
}