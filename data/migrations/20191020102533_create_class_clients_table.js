exports.up = function(knex) {
  return knex.schema.createTable('class_clients', tbl => {
    tbl
      .integer('classId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('clientId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
    tbl.primary(['classID', 'clientId']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('class_clients');
};
