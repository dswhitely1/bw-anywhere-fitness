exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('table_name').insert([
        { classId: 1, clientId: 2 },
        { classId: 2, clientId: 2 },
      ]);
    });
};
