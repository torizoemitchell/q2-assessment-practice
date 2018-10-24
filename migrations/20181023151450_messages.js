
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments().notNullable()
   table.string('name', 255).notNullable().defaultTo(null)
   table.string('message', 255).notNullable().defaultTo(null)
   table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages')
};
