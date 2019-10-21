const db = require('../dbConfig');

function find() {
  return db('classes');
}

function findBy(filter) {
  return db('classes')
    .where(filter)
    .returning('*');
}

function add(newClass) {
  return db('classes')
    .insert(newClass)
    .returning('*');
}

function update(id, editClass) {
  return db('classes')
    .where({ id })
    .update(editClass)
    .returning('*');
}

function remove(id) {
  return db('classes')
    .where({ id })
    .del();
}

module.exports = { find, findBy, add, update, remove };
