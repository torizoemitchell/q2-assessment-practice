exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 1, name: 'Criminal', message: 'What Are You?'},
        {id: 2, name: 'Batman', message: 'I\'m Batman'}
      ])
      .then(function() {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))")
        })
    })
}
