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
        ...req.body
       })
       await user.save()
       return res.send(user);
});

router.delete('/:idUser', async (req, res) => {
    const id = req.params.idUser;
    await User.findByIdAndDelete(id)
    return res.send({
        deletedUserId: id
    });
});

router.get('/domain/:domain', async (req, res) => {
    const domain = req.params.domain
    const users = await User.find({domain: `${domain}`})
    return res.send({
        domainUsers: [users]
    });
});

router.get('/name/:name', async (req, res) => {
    const name = req.params.name
    const first_name_param = name.split(" ")[0]
    const last_name_param = name.split(" ")[1]
    const users = await User.find({first_name: `${first_name_param}`, last_name: `${last_name_param}`})
    return res.send({
        nameUsers: [users]
    });
});

// router.get('/cost/:domain', async (req, res) => {
//     const domain = req.params.domain
//     const users = await User.aggregate([
//         {
//           $group:
//             {
//               domain: `${domain}`,
//               sumOfCost: { $sum: "$cost" }
//             }
//         }
//       ])
//     return res.send({
//         domain: domain,
//         sumOfCost: sum
//     });
// });

module.exports = router;