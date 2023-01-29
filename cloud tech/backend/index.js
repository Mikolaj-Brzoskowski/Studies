const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const port = 5000
let messagesArray = ['Hello World!']

app.use((req, res, next) => {

  const cred = {
      login: 'admin',
      pass: 'secret'
  };

  const base64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, pass] = Buffer.from(base64auth, 'base64').toString().split(':');

  if (login && pass && login === cred.login && pass === cred.pass) {
    res.set("WWW-Authenticate", "Basic realm= my realm");
    return next();
  }
  else {
    res.status(401).send("Access denied: Authentication required");
  }

});

app.get('/data', (req, res, next) => {
  res.status(200).send(messagesArray);
})

app.post('/data', (req, res, next) => {
    message = req.body.message;
    messagesArray.push(message);
    res.status(200).send(message);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})