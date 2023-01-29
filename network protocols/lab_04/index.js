var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("Hello World")
})

app.post('/',function(req, res){
    res.send("Post working")
})

app.listen(2500, function() {
    console.log('App listening on port 2500!')
})