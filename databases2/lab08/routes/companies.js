const express = require('express');
const router = express.Router({mergeParams: true});
const driver = require('../config/neo4jDriver');

router.get('/name/:name', async (req, res) => {
    const name = req.params.name
    const session = driver.session();
    const result = await session.run(
      'MATCH (o:Organization {name: $name}) ' +
      'RETURN o', {'name': name}
    )
    session.close();
    return res.send(result.records);
});

router.get('/', async (req, res) => {
  const session = driver.session();
  const result = await session.run(
    'MATCH (o:Organization) ' +
    'RETURN o'
  )
  session.close();
    return res.send({result});
});

router.get('/city/:city', async (req, res) => {
  const city = req.params.city;
  const session = driver.session();
  const result = await session.run(
    'MATCH p=(o: Organization)-[r:ADDRESS]->(a: Address) WHERE a.address = $city RETURN p',
    {'city': city}
  )
  session.close();
  return res.send(result.records);
});

router.get('/year/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  const session = driver.session();
  const result = await session.run(
    'MATCH (o:Organization) WHERE o.registrationDate.year = $year ' +
    'RETURN count(o) as Count', {'year': year}
  )
  session.close();
  return res.send(result.records);
});

router.get('/owns/:perc', async (req, res) => {
  const perc = req.params.perc;
  const session = driver.session();
  const result = await session.run(
    `MATCH (o: Organization)-[r:OWNS]->(c: Organization) WHERE c.ownershipPercentage > $perc ` +
    `RETURN c`, {'perc': perc}
  )
  session.close();
  return res.send(result.records);
});

router.get('/owns', async (req, res) => {
  const session = driver.session();
  const result = await session.run(
    `MATCH (o: Organization)-[r:OWNS]->(c: Organization)-[r:OWNS]->(c: Organization) WHERE c.ownershipPercentage > 0 ` +
    `RETURN c`, {'perc': perc}
  )
  session.close();
  return res.send(result.records);
});

module.exports = router;
