const express = require('express');
const router = express.Router({ mergeParams: true });

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find({})
    return res.send({posts});
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    return res.send({post});
});

router.post('/:userId', async (req, res) => {
    const userID = req.params.userId
    const post = {
        ...req.body,
        author: userID
    }
    post.save()
    //i tutaj trza dać populate
    return res.send(req.body);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await findByIdAndDelete(id)
    return res.send({
        deletedUserId: id
    });
});

module.exports = router;
