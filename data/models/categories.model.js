const db = require('../dbConfig');

function find() {
  return db('categories');
}

function add(category) {
  return db('categories')
    .insert(category)
    .returning('*');
}

function update(id, category) {
  return db('categories')
    .where({ id })
    .update(category)
    .returning('*');
}

function remove(id) {
  return db('categories')
    .where({ id })
    .del();
}

module.exports = { find, add, update, remove };
