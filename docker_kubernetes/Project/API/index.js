const express = require('express')
const app = express()
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

let events = ['Test event']
let comments = {
    'Test event':['Test comment 1', 'Test comment 2'],
}

app.use(bodyParser.json());
app.use(cors());
const port = 4000;

const introspectionEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/token/introspect";
const userInfoEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/userinfo";

const webappClientId = "ticket-webappclient";
const webappClientSecret = "R2Ois8o9uwGbtsXzUvroUxcQ64ZZY0vj";

const backendClientId = "ticket-backendclient";
const backendClientSecret = "orXMNP8bAGtLwNxK1JZVpfzLH0JCI9Cw";

app.get('/unprotectedData', (req, res, next) => {
    res.send({
        events
    }  
    );
})

app.post('/unprotectedData', (req, res, next) => {
    const event = req.body.event;
    events.push(event)
    comments[event] = [];
    res.send({
        added_event: event
    });
})

app.get('/webAppProtectedData', (req, res, next) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    
    const params = new URLSearchParams();
    params.append('client_id', webappClientId);
    params.append('client_secret', webappClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            res.send({
                comments
            }
            );
           
        }
        else {
            res.status(401);
            res.send({
                error: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
})

app.post('/webAppProtectedData', (req, res, next) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    
    const params = new URLSearchParams();
    params.append('client_id', webappClientId);
    params.append('client_secret', webappClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            const key = req.body.event;
            const comment = req.body.comment;
            comments[key].push(comment)
                res.send({
                    added_comment: comment,
                    to_event: key
                });
        }
        else {
            res.status(401);
            res.send({
                error: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
})

app.get('/backendProtectedData', (req, res, next) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    
    const params = new URLSearchParams();
    params.append('client_id', backendClientId);
    params.append('client_secret', backendClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            res.send(
                {
                    comments
                } 
            );
        }
        else {
            res.status(401);
            res.send({
                error: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
})

app.post('/backendProtectedData', (req, res, next) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    
    const params = new URLSearchParams();
    params.append('client_id', backendClientId);
    params.append('client_secret', backendClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            const key = req.body.event;
            const comment = req.body.comment;
            comments[key].push(comment);
                res.send({
                    added_comment: comment,
                    to_event: key
                });
        }
        else {
            res.status(401);
            res.send({
                error: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
})

// app.get('/spa/data', (req, res) => {

//     const accessToken = (req.headers.authorization || '').split(' ')[1] || '';

//     if (!accessToken) {
// 		return res.status(401).end();
// 	}

//     const payload = jwt.verify(accessToken, realmPemCert, { algorithms: ['RS256']});
//     console.log(payload);
//     // Tutal logika sprawdzania pola exp - DoItYourself
//     if (payload.exp) {
//         res.send(
//             {
//                 comments
//             } 
//         );
//     }
//     return res.status(401).end();
// });


app.listen(port, () => {
    console.log(`Listening app on port ${port}`)
})