const express = require('express');
const router = express.Router({mergeParams: true});
const client = require('../config/redisClient');


router.get('/', async (req, res) => {
    const keys = await client.keys("user-preferences:*")
    return res.json({keys});
});

router.get('/:key', async (req, res) => {
    const key = req.params.key
    const item = await client.get(`user-preferences:${key}`)
    return res.json({item});
});

router.post('/', async (req, res) => {
    const key = req.body.key
    const value = req.body.value
    const expireIn = req.body.expireIn
    if (expireIn !== null) {
        await client.setex(`user-preferences:${key}`, expireIn, value)
    }
    else {await client.set(`user-preferences:${key}`, JSON.stringify(value))}
    return res.json(req.body);
});

router.put('/:key', async (req, res) => {
    const key = req.params.key;
    const value = req.body.value
    const expireIn = req.body.expireIn
    if (expireIn !== null) {
        await client.setex(`user-preferences:${key}`, expireIn, value)
    }
    else {await client.set(`user-preferences:${key}`, JSON.stringify(value))}
    return res.json({
        updatedPreference: key
    });
});

router.delete('/:key', async (req, res) => {
    const key = req.params.key;
    await client.del(`user-preferences:${key}`)
    return res.json({
        deletedPreference: key
    });
});


module.exports = router;
