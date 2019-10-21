exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('class_clients')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('class_clients').insert([{ classId: 1, clientId: 2 }]);
    });
};
