exports.up = function(knex) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    tbl.string('description', 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categories');
};
