const books = [
  {title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0","1"]},
  {title: "Caliban’s War", publishingYear: 2012}
];

exports.add = (book) => {
  books.push(book);
}

// Export all as a function that returns the books array
exports.all = () => {
  return books;
}

exports.get = (idx) => {
  return books[idx];
}

exports.update = (book) => {
  books[book.id] = book;
}

exports.upsert = (book) => {
  if (book.authorIds && !Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}


