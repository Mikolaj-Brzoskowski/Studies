const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const { POOL, TESTDATAPOST, GETDATA, CREATEDATA, GETDATABYID, UPDATEDATA, DELETEDATA, TESTDATA } = require('./queries.js');


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (req, res) => {
    res.json({
        info: "Successful connect to API"
    })
})

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})

app.get('/data', GETDATA)
app.get('/data/:id', GETDATABYID)
app.post('/data', CREATEDATA)
app.put('/data/:id', UPDATEDATA)
app.delete('/data/:id', DELETEDATA)
app.get('/testdata', TESTDATA)
app.post('/testdatapost', TESTDATAPOST)

exports.server = server