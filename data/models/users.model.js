const db = require('../dbConfig');

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .returning('*');
}

function add(user) {
  return db('users')
    .insert(user)
    .returning('*');
}

function update(id, user) {
  return db('users')
    .where({ id })
    .update(user)
    .returning('*');
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = { find, findBy, add, update, remove };
