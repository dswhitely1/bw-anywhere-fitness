const db = require('../dbConfig');

class Model {
  constructor(tableName) {
    this.tableName = tableName;
  }

  find() {
    return db(this.tableName);
  }

  findBy(filter) {
    return db(this.tableName).where(filter);
  }

  add(newItem) {
    return db(this.tableName)
      .insert(newItem)
      .returning('*');
  }

  update(id, item) {
    return db(this.tableName)
      .where({ id })
      .update(item)
      .returning('*');
  }

  remove(id) {
    return db(this.tableName)
      .where({ id })
      .del();
  }
}

const Users = new Model('users');
const Classes = new Model('classes');
const Categories = new Model('categories');
const ClassClients = new Model('class_clients');

module.exports = { Users, Classes, Categories, ClassClients };
