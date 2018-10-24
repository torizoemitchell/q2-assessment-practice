// Define DB connections for different environments
module.exports = {
development: {
 client: 'pg',
 connection: 'postgres://localhost/messages'
},
test: {
  client: 'pg',
  connection: 'postgres://localhost/messages'
},
production: {
 client: 'pg',
 connection: process.env.DATABASE_URL
}
}
