const express = require("express");
const router = express.Router({mergeParams: true});
const client = require("../config/redisClient");

router.get("/", async (req, res) => {
    const decks = await client.keys('game:*')
    return res.send({decks});
});

router.get("/:deck-id", async (req, res) => {

    return res.send({});
});

router.post("/", async (req, res) => {
    const id = req.body.id
    const value = req.body.value
    await client.set(`game:${id}`, JSON.stringify(value))
    return res.send(req.body);
});

router.post("/new-game", async (req, res) => {
    const id = req.body.id
    const deck = await client.get(`game:${id}`)
    console.log(deck)
    await client.set(`game:${id}:deck:deck-${id}`, deck)
    const value = await client.mget(`game:${id}:deck:deck${id}`)
    return res.send(deck);
});

module.exports = router;
