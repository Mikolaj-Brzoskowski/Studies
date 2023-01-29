const express = require('express');
const app = express();

app.use(express.json());

const users = require('./routes/serwer');
app.use('/users', users);

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'kolokwium'
};

const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const apiPort = process.env.PORT || 3000
        const apiHost = process.env.API_HOST || 'localhost';
        app.listen(apiPort, () => {
            console.log(`API server available from: http://${apiHost}:${apiPort}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));

