exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('firstName', 128);
    tbl.string('lastName', 128);
    tbl.string('email', 128);
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('password', 128);
    tbl.timestamps(true, true);
    tbl
      .integer('roleId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
