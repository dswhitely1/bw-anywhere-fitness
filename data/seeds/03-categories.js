exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { name: 'Pilates' },
        { name: 'Yoga' },
        { name: 'Lagree' },
        { name: 'Barre' },
        { name: 'Spin' },
        { name: 'Zumba' },
      ]);
    });
};
