let comments = [];

// Add a new comment
exports.add = (comment) => {
  comments.push(comment);
};

// Get comments for a specific book
exports.getCommentsForBook = (bookId) => {
  return comments.filter(comment => comment.bookId === bookId);
};

// Get a comment by its ID
exports.getCommentById = (commentId) => {
  return comments.find(comment => comment.id === commentId);
};

// Update an existing comment
exports.update = (comment) => {
  const index = comments.findIndex(c => c.id === comment.id);
  if (index !== -1) {
    comments[index] = comment;
  }
};

// Delete a comment by its ID
exports.delete = (commentId) => {
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    comments.splice(index, 1);
  }
};

// Get all comments
exports.all = comments;



