const express = require('express')
const app = express()
const config = require('../Project_docker/mybackend/conf')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { Pool } = require('pg');

const pgClient = new Pool ({
    host: config.postgresHost,
    user: config.postgresUser,
    database: config.postgresDB,
    password: config.postgresPassword
})

pgClient.on('error', () => console.log('Couldnt connect to postgres'))
pgClient.on('connect', () => console.log('Connected to postgres'))
pgClient.query(`CREATE TABLE IF NOT EXISTS szafa_db (szafaName varchar(45) NOT NULL)`).catch(err => console.log(err))

const PORT = 8080;

app.get('/szafa', (req, res) => {
  var result  = pgClient.query(`SELECT * FROM szafa_db`)
  return res.send(result.rows)
})

app.post('/szafa', (req, res) => {
  var added = req.body.szafaName
  pgClient.query(`INSERT INTO szafa_db (szafaName) VALUES ('${added}'::character varying)`)
  return res.send(added);
})

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
})

