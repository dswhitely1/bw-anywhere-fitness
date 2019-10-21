exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('classes').insert([
        { title: 'Yoga', instructorId: 1, categoryId: 1 },
        { title: 'Water Aerobics', instructorId: 1, categoryId: 2 },
      ]);
    });
};
