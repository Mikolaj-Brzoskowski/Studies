const express = require('express');
const router = express.Router();
const client = require('../config/redisClient');

router.get('/', async (req, res) => {
    const list = await client.lrange('user-queue', 0, -1)
    return res.json({
        allUsers: [...list]
    });
});

router.post('/', async (req, res) => {
    const item = req.body
    client.rpush('user-queue', `${item}`)
    return res.json(req.body);
});

router.get('/:range', async (req, res) => {
    const range = req.params.range
    const list = await client.lrange('user-queue', 0, range)
    return res.json({
        rangeUsers: list
    });
});


router.delete('/', async (req, res) => {
    const user = await client.lindex('user-queue', 0)
    await client.lpop('user-queue')
    return res.json({
        poppedUser: user
    });
});

module.exports = router;
