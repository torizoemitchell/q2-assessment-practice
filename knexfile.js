// Define DB connections for different environments
module.exports = {
development: {
 client: 'pg',
 connection: 'postgres://localhost/messages'
},
test: {},
production: {
 client: 'pg',
 connection: process.env.DATABASE_URL
}
}
