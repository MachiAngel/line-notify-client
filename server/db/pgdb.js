
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment];

const knex = require('knex')

let db;


if (!db) {
  db = knex(config)
}



module.exports = db
