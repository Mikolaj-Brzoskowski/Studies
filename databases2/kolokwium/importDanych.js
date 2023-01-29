const fs = require('fs');
const data = fs.readFileSync('data.json')
const toPost = JSON.parse(data.toString())
const axios = require('axios')

toPost.reduce(async (acc, curr) => {
    await axios.post("http://localhost:3000/users", curr)
})

