const express = require('express')
const app = express()
const config = require('./conf')

const { Pool } = require('pg');

const pgClient = new Pool ({
    user: config.postgresUser,
    host: config.postgresHost,
    database: config.postgresDB,
    password: config.postgresPassword
})

pgClient.on('error', () => console.log('Couldnt connect to postgres'))
pgClient.on('connect', () => console.log('Connected to postgres'))
pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT')
        .catch(err => console.log(err))

const PORT = 8080;

app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
})

