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
    const {login, email, registrationDate} = req.body
    const user = new User({
      login,
      email,
      registrationDate
    })
    await user.save()
    return res.send(req.body);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  await User.findById(id).then(function(user) {
    return res.send(user)
  }).catch(function(err) {
    return res.send({error: err})
  })
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {login, email, registrationDate} = req.body
    await User.findByIdAndUpdate(id, {login, email, registrationDate}).then(function() {
      return res.send({
        putUserId: id
      });
    }).catch(function(err) {
      return res.send({error: err})
    })
    
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id).then(function() {
    return res.send({
      deletedUserId: id
    });
  }).catch(function(err) {
    return res.send({error: err})
  })
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body).then(function() {
      return res.send({
        patchUserId: id
      });
    }).catch(function(err) {
      return res.send({error: err})
    })
});

module.exports = router;
