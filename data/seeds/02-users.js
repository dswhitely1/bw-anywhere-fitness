const generators = require('../../api/utils/generators');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstName: 'Test',
          lastName: 'Instructor',
          email: 'testInstructor@anytimefitness.com',
          username: 'instructor',
          password: generators.password('password'),
          roleId: 1,
        },
        {
          firstName: 'Test',
          lastName: 'Client',
          email: 'testCLient@anytimefitness.com',
          username: 'client',
          password: generators.password('password'),
          roleId: 2,
        },
      ]);
    });
};
