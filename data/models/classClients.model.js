const db = require('../dbConfig');

function find() {
  return db('class_clients');
}

function findBy(filter) {
  return db('class_clients')
    .where(filter)
    .returning('*');
}

function add(mapping) {
  return db('class_clients')
    .insert(mapping)
    .returning('*');
}

function remove(id) {
  return db('class_clients')
    .where({ id })
    .del();
}

module.exports = { find, findBy, add, remove };
