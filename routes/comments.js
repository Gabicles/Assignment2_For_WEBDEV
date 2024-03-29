const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.get('/edit/:id', async (req, res, next) => {
  const commentId = req.params.id;
  const comment = await Comment.get(commentId);
  if (!comment) {
    // Handle comment not found error
  } else if (comment.userEmail !== req.session.currentUser.email) {
    // Handle unauthorized access error (user trying to edit someone else's comment)
  } else {
    res.render('comments/edit', { title: 'Edit Comment', comment: comment });
  }
});


router.post('/upsert', async (req, res, next) => {
  // Validate and sanitize comment data from the form
  const comment = {
    id: req.body.id || null, // Handle new or existing comment
    bookId: req.body.bookId,
    userEmail: req.session.currentUser.email, // Ensure logged-in user
    text: req.body.text,
  };
  await Comment.upsert(comment);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Comment saved!',
  };
  res.redirect(`/books/show/${comment.bookId}`); // Redirect back to book show page
});


module.exports = router;
