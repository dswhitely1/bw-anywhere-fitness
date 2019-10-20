exports.up = function(knex) {
  return knex.schema.createTable('classes', tbl => {
    tbl.increments();
    tbl
      .integer('instructorId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('categoryId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.date('scheduleTime');
    tbl.string('address', 128);
    tbl.string('city', 128);
    tbl.string('state', 128);
    tbl.string('zipCode', 128);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('classes');
};
