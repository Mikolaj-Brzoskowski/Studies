// Do zdefiniowania aplikacji użyjemy Express.js
const { query } = require('express');
const express = require('express');
const app = express();

// Nasza aplikacja będzie „konsumowała” dane w formacie JSON
app.use(express.json());

//==================================================================
// Definiujemy REST API – kod poniżej wymaga uzupełnienia
//==================================================================

// Pobieranie danych na temat wszystkich zespołów
app.get('/bands', async (req, res) => {
  const bands = await client.query("SELECT * FROM band;");
  const result = bands.rows
  return res.send({
    allGroups: result
  });
});

// Dodawanie rekordów do bazy
app.post('/bands', async (req, res) => {
  const message = {
    toInsert: req.body
  };
  const posted = await client.query(`INSERT INTO band (name, creationDate) VALUES ('${req.body.name}', '${req.body.creationDate}');`)
  return res.send(message);
});

// Pobieranie danych na temat zespołu o danej nazwie
app.get('/bands/:bandName', async (req, res) => {
  let name = req.params.bandName;
  const band = await client.query(`SELECT * FROM band WHERE name='${name}';`)
  const result = band.rows
  return res.send({
    queryFor: result
  });
});

// Usuwanie rekordu związanego z zespołem
app.delete('/bands/:id', async (req, res) => {
  let id = req.params.id;
  const deleting = await client.query(`DELETE FROM band WHERE id=${id};`)
  return res.send({
    deletedBandId: id
  });
});

// Aktualizacja rekordu związanego z zespołem
app.put('/bands/:id', async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  const editing = await client.query(`UPDATE band SET name='${data.name}',
                                                      creationDate='${data.creationDate}' 
                                                      WHERE id=${id};`)
  return res.send({
    updatedBandId: id,
    data
  });
});

//==================================================================
// Poniższy kod nie powinien już wymagać zmian
//==================================================================

// Przygotowujemy/wczytujemy konfigurację połączenia z PostgreSQL-em
require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem PostgreSQL wykorzystamy bibliotekę pg

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
