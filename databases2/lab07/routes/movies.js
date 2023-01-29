const express = require('express');
const router = express.Router({mergeParams: true});
const driver = require('../config/neo4jDriver');

router.get('/', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.readTransaction((tx) =>
            tx.run("MATCH (m:Movie) RETURN m.title as title"));
            
        session.close();
        const respond = result.records.map(record => {
            return record.get('title');
        });
        return res.send(respond);
    } catch(ex) {
        res.send(ex);
    }
});

router.get('/:id', async (req, res) => {
  const id = await req.params.id
  const session = driver.session();
  const result = await session.run(
    'MATCH (m:Movie) ' +
    `WHERE ID(m) = ${id} ` +
    'RETURN m'
  )
  session.close();
    return res.send({result});
});


router.post('/', async (req, res) => {
    const session = driver.session();
    await session
        .run('MERGE (m:Movie {title: $title, releaseYear: $year, genre: $genre}) RETURN m.title', 
        {'title': req.body.title, 'year': req.body.year, 'genre': req.body.genre})
        .subscribe({
          onKeys: keys => {
            console.log(keys)
          },
          onNext: record => {
            console.log(record.get('m.title'))
          },
          onCompleted: () => {
            session.close();
            return res.send({});
          },
          onError: error => {
            console.log(error)
          }
        })
});

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const session = driver.session();
  const result = await session.run(
    `MATCH (m:Movie) WHERE ID(m) = ${id} ` +
    `SET m = {title : \'${req.body.title}\', releaseYear: \'${req.body.year}\', genre: \'${req.body.genre}\'} ` +
    `RETURN m`
  )
session.close();
  return res.send({result});
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const session = driver.session();
  const result = await session.run(
    `MATCH (m:Movie)
    WHERE ID(m) = ${id}
    DETACH DELETE m`
  )
  session.close();
    return res.send({result});
});

router.post('/assign-actor', async (req, res) => {
  const movieId = req.body.movieId
  const actorId = req.body.actorId
  const session = driver.session();
  const result = await session.run(
    `MATCH (a:Actor),(m:Movie) WHERE ID(a) = ${actorId} AND ID(m) = ${movieId} ` +
    `MERGE (a)-[r:ACTED_IN]->(m) ` +
    `RETURN type(r)`
  )
  session.close();
    return res.send({result});
});

module.exports = router;
