

// Import necessary modules
const db = require('../database');

// Retrieve all authors
exports.all = async () => {
  const sql = 'SELECT * FROM authors ORDER BY id';
  return await db.query(sql);
};

// Add a new author
exports.add = async (author) => {
  const sql = 'INSERT INTO authors (first_name, last_name) VALUES ($1, $2)';
  const params = [author.firstName, author.lastName];
  await db.query(sql, params);
};

// Retrieve an author by ID
exports.get = async (id) => {
  const sql = 'SELECT * FROM authors WHERE id = $1';
  const params = [id];
  const result = await db.query(sql, params);
  return result[0]; // Assuming there's only one author with the given ID
};

// Update an existing author
exports.update = async (author) => {
  const sql = 'UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3';
  const params = [author.firstName, author.lastName, author.id];
  await db.query(sql, params);
};

// Upsert an author
exports.upsert = async (author) => {
  if (author.id) {
    await exports.update(author);
  } else {
    await exports.add(author);
  }
};
