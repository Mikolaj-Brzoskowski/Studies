const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const pkceChallenge = require("pkce-challenge").default;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const appPort = 5000;

const authEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/auth";
const tokenEndpoint = "http://localhost:8080/realms/myrealm/protocol/openid-connect/token";

const apiProtectedEnpoint = "http://localhost:4000/webAppProtectedData";
const apiUnprotectedEnpoint = "http://localhost:4000/unprotectedData";

const clientId = "ticket-webappclient";
const clientSecret = "R2Ois8o9uwGbtsXzUvroUxcQ64ZZY0vj";

const redirectUri = "http://localhost:5000/myredirect";

global.challenge = pkceChallenge();
const codeVerifier = challenge.code_verifier

app.use((req, res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
});

app.get('/', (req, res) => {

    const codeChallenge = challenge.code_challenge
    const authRequest = `${authEndpoint}?response_type=code&client_id=${clientId}&state=1234&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    res.set('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
    <body>
    <h2>Welcome to my app</h2>
    <div>
      <a href="${authRequest}">Please Login to get comments</a>
      <a href="http://localhost:5000/events">Events</a>
    </div>
    </body>
    </html>
    `);

});

app.get('/events', (req, res) => {

    return axios.get(apiUnprotectedEnpoint).then(result => {
        let success = true;
        if (result.status !== 200) {
            success = false;
        }
        res.set('Content-Type', 'text/html');
        res.send(`
        <!DOCTYPE html>
         <body>
         <h2>Events</h2>
         <p>Unprotected resources: ${result.data.events}</p>
         </body>
         </html>
         `);
    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'text/html');
        res.send(`
        <!DOCTYPE html>
         <body>
         <h2>Error</h2>
         </body>
        </html>
        `)}
     );
})

app.post('/events', (req, res) => {
    const event = req.body.event;
    return axios.post(apiUnprotectedEnpoint, {
        event: event
    })
    .then(result => {
        let success = true;
        if (result.status !== 200) {
            success = false;
        }
        res.set('Content-Type', 'text/html');
        res.send(`
        <!DOCTYPE html>
         <body>
         <h2>Success? ${success}</h2>
         <p>Posted event: ${result.data.added_event}</p>
         </body>
         </html>
         `);
    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'text/html');
        res.send(`
        <!DOCTYPE html>
            <body>
            <h2>Error</h2>
            </body>
        </html>
        `)}
        );
    })

app.get('/myredirect', (req, res) => {

const params = new URLSearchParams();

params.append('grant_type', 'authorization_code');
params.append('redirect_uri', redirectUri);
params.append('client_id', clientId);
params.append('client_secret', clientSecret);
params.append('code_verifier', codeVerifier);
params.append('code', req.query.code);

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
    res.set('Content-Type', 'text/html');
    appendString='';
        for(var key in result.data.comments) {
        appendString += result.data.comments[key]
    } 
    res.send(`
    <!DOCTYPE html>
        <body>
        <h2>Comments</h2>
        <p>Protected resources: ${appendString}</p>
        </body>
        </html>
        `);
})
.catch(error => {
    console.log(error);
    res.set('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
        <body>
        <h2>Error</h2>
        </body>
    </html>
    `)}
    );
});

app.post('/myredirect', (req, res) => {

const params = new URLSearchParams();

params.append('grant_type', 'authorization_code');
params.append('redirect_uri', redirectUri);
params.append('client_id', clientId);
params.append('client_secret', clientSecret);
params.append('code_verifier', codeVerifier);
params.append('code', req.query.code);

const comment = req.body.comment;
const event = req.body.event;

return axios.post(tokenEndpoint, params)
.then(result => {
    data = {
        event: event,
        comment: comment
    },
    accessToken = result.data.access_token || '';
    return axios.post(apiProtectedEnpoint, data, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
})
.then(result => {
    res.set('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
        <body>
        <h2>Success? ${result.data.success}</h2>
        <p>Posted comment: ${result.data.added_comment}</p>
        <p>Comment added to event: ${result.data.to_event}</p>
        </body>
        </html>
        `);
})
.catch(error => {
    console.log(error);
    res.set('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
        <body>
        <h2>Error</h2>
        </body>
    </html>
    `)}
    );
});

app.listen(appPort, err => {
    console.log(`App listening on port ${appPort}`);
});
