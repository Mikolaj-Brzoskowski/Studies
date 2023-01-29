// Do zdefiniowania aplikacji użyjemy Express.js
const { query } = require('express');
const express = require('express');
const app = express();
const fastcsv = require("fast-csv")
const fs = require("fs");
const ws = fs.createWriteStream("sample_table.csv");

app.use(express.json());

app.get('/bands', async (req, res) => {
  const data = await client.query("SELECT id, name, creationDate,EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM creationDate) AS years FROM band;")
  const result = data.rows
  const jsonData = JSON.parse(JSON.stringify(result));
  fastcsv.write(jsonData, {headers: true})
  .on("finish", function() {
    console.log(`Plik utworzony, data wyeksportowana`)
  })
  .pipe(ws)
  return res.send(result);
})



require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD
};

const { Client } = require('pg');
const client = new Client(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));
