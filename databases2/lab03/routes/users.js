const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find({})
    return res.send({
        allUsers: [users]
    });
});

router.post('/', async (req, res) => {
    const user = new User({
     ...req.body,
      registrationDate: new Date()
    })
    await user.save()
    return res.send(user);
});

router.get('/:idUser', async (req, res) => {
    const id = req.params.idUser;
    const user = await User.findById(id)
    return res.send({user});
});

router.put('/:idUser', async (req, res) => {
    const id = req.params.idUser;
    const {login, email} = req.body
    await User.findByIdAndUpdate(id, {login: login,
                                    email: email,
                                    registrationDate: new Date()})
    return res.send({
        putUserId: id
    });
});

router.delete('/:idUser', async (req, res) => {
    const id = req.params.idUser;
    await User.findByIdAndDelete(id)
    return res.send({
        deletedUserId: id
    });
});

router.patch('/:idUser', async (req, res) => {
    const id = req.params.idUser;
    await User.findByIdAndUpdate(id, {...req.body, registrationDate: new Date()})
    return res.send({
        patchUserId: id
    });
});

module.exports = router;
