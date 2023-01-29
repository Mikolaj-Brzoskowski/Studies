const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const appPort = 6000;

const tokenEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/token";

const apiProtectedEnpoint = "http://localhost:4000/backendProtectedData";
const apiUnprotectedEnpoint = "http://localhost:4000/unprotectedData"

const clientId = "ticket-backendclient";
const clientSecret = "orXMNP8bAGtLwNxK1JZVpfzLH0JCI9Cw";

app.use((req, res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
});

app.get('/unprotectedData', (req, res) => {
    return axios.get(apiUnprotectedEnpoint).then(result => {
        let success = true;
        if (result.status !== 200) {
            success = false;
        }
        res.set('Content-Type', 'application/json');
        res.send({ 
            success: success,
            events: result.data.events
        });
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({ 
            error
        })}
     );
})

app.post('/unprotectedData', (req, res) => {
    const event = req.body.event;
    return axios.post(apiUnprotectedEnpoint, {
        event: event
    }).then(result => {
        let success = true;
        if (result.status !== 200) {
            success = false;
        }
        res.set('Content-Type', 'application/json');
        res.send({ 
            success: success,
            data: result.data
        });
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({ 
            error
        })}
     );
})

app.get('/protectedData', (req, res) => {

const params = new URLSearchParams();

params.append('grant_type', 'client_credentials');
params.append('client_id', clientId);
params.append('client_secret', clientSecret);

return axios.post(tokenEndpoint, params)
.then(result => {
    accessToken = result.data.access_token || '';
    return axios.get(apiProtectedEnpoint, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
})
.then(result => {
    let success = true;
    if (result.status !== 200) {
        success = false;
    }
    res.set('Content-Type', 'application/json');
    res.send({ 
        success: success,
        comments: result.data.comments
    });
})
.catch(error => {
    res.set('Content-Type', 'text/html');
    res.send({ 
        error
    })}
    );
});

app.post('/protectedData', (req, res) => {
const comment = req.body.comment;
const event = req.body.event;
const params = new URLSearchParams();

params.append('grant_type', 'client_credentials');
params.append('client_id', clientId);
params.append('client_secret', clientSecret);

return axios.post(tokenEndpoint, params)
.then(result => {
    data = {
        event: event,
        comment: comment
    },
    accessToken = result.data.access_token || '';
    return axios.post(apiProtectedEnpoint, data,    
    {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    })
})
.then(result => {
    let success = true;
    if (result.status !== 200) {
        success = false;
    }
    res.set('Content-Type', 'application/json');
    res.send({ 
        success: success,
        data: result.data
    });
})
.catch(error => {
    res.set('Content-Type', 'text/html');
    res.send({ 
        error
    })}
    );
});

// const SPAclient = "ticket-react"

// app.get('/spaData', (req, res) => {

//     const params = new URLSearchParams();
    
//     params.append('grant_type', 'implicit');
//     params.append('client_id', SPAclient);
//     params.append('response_type', 'token');
    
//     return axios.post(tokenEndpoint, params)
//     .then(result => {
//         accessToken = result.data.access_token || '';
//         return axios.get(apiProtectedEnpoint, {
//             headers: {
//                 'Authorization': 'Bearer ' + accessToken
//             }
//         })
//     })
//     .then(result => {
//         let success = true;
//         if (result.status !== 200) {
//             success = false;
//         }
//         res.set('Content-Type', 'application/json');
//         res.send({ 
//             success: success,
//             comments: result.data.comments
//         });
//     })
//     .catch(error => {
//         res.set('Content-Type', 'text/html');
//         res.send({ 
//             error
//         })}
//         );
//     });

app.listen(appPort, err => {
    console.log(`App listening on port ${appPort}`);
});
