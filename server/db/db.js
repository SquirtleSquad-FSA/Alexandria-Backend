const { Pool, Client } = require('pg')
const SQL = require('sql-template-strings')
const connectionString = 'postgresql://localhost:5432/Alexandria'

const pool = new Pool({
    connectionString,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

const client = new Client({
    connectionString,
})

module.exports = { pool, SQL, client }
