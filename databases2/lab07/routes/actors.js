const express = require('express');
const router = express.Router({mergeParams: true});
const driver = require('../config/neo4jDriver');

router.get('/', async (req, res) => {
    const session = driver.session();
    const result = await session.run(
      'MATCH (a:Actor) ' +
      'RETURN a'
    )
    session.close();
    return res.send(result.records);
});

router.get('/:id', async (req, res) => {
  const id = await req.params.id
  const session = driver.session();
  const result = await session.run(
    'MATCH (a:Actor) ' +
    `WHERE ID(a) = ${id} ` +
    'RETURN a'
  )
  session.close();
    return res.send({result});
});


router.post('/', async (req, res) => {
    const session = driver.session();
    await session
        .run('MERGE (a:Actor {name : $actorName, age:$actorAge, company: $actorCompany}) RETURN a.name', 
        {'actorName': req.body.name, 'actorAge': req.body.age, 'actorCompany': req.body.company})
        .subscribe({
          onKeys: keys => {
            console.log(keys)
          },
          onNext: record => {
            console.log(record.get('a.name'))
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
      `MATCH (a:Actor) WHERE ID(a) = ${id} ` +
      `SET a = {name : \'${req.body.name}\', age: \'${req.body.age}\', company: \'${req.body.company}\'} ` +
      `RETURN a`
    )
  session.close();
    return res.send({result});
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const session = driver.session();
    const result = await session.run(
      `MATCH (a:Actor) WHERE ID(a) = ${id} ` +
      'DELETE a'
    )
    return res.send({result});
});

module.exports = router;
