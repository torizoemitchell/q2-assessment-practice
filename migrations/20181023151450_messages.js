
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments()
   table.string('name').notNullable().defaultTo('')
   table.string('message').notNullable().defaultTo('')
   table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages')
};
