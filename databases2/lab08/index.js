const express = require('express');
const app = express();
const companies = require('./routes/companies');
const address = require('./routes/address');
require('dotenv').config();

app.use(express.json());

// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem Neo4J wykorzystamy bibliotekę neo4j-driver
try {
  require('./config/neo4jDriver');

  app.use('/companies', companies); 
  app.use('/address', address); 

  console.log(`Connected to Neo4J.`)
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
  });
} catch(ex) {
  console.error('Error connecting to Neo4J', ex);

}