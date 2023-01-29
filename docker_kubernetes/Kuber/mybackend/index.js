const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let number = 0

app.listen(5000, () => {
    number = getRandomIntInclusive(1, 100)
    console.log("Server running on port 5000");
});

app.get('/hello', (req, res) => {
    res.send(number.toString())
  })