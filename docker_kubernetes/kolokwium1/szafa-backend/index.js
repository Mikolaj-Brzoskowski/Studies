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
pgClient.query(`CREATE TABLE IF NOT EXISTS szafa_db (szafa_name varchar(45) NOT NULL)`)
        .catch(err => console.log(err))

const PORT = 8080;

app.get('/szafa', (req, res) => {
  const result  = pgClient.query(`SELECT * FROM szafa_db`)
  //res.send(result.rows)
  res.send('Hello world!')
})

app.post('/szafa', (req, res) => {
  const posted = pgClient.query(`INSERT INTO szafa_db (szafa_name)
    VALUES ('${req.body.szafa_name}');`)
  return res.send(posted);
})

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
})

