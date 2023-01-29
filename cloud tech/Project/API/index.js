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
//     const realmPemCert = "MIICnTCCAYUCBgGBoPMcwjANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdteXJlYWxtMB4XDTIyMDYyNjE2NTYzNloXDTMyMDYyNjE2NTgxNlowEjEQMA4GA1UEAwwHbXlyZWFsbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKHBg+J6mmr7LtE1UbL/C0To5hoFRWstYhmlAz45TOgKuq0wCiTcAw7Irm1T2Pi8PmA8hdM2x0K+7OUmjo5DzG7pUbndICDSVmLNEhr3d+ACaZkWlSFpWUki5hiidpImWTNr9/EOCLu8xYDkqyKZo3jbwqTuwWXQI2FCdNRvBRhbQmFySU3fnsv8iy2Ba1SC/RRMKE4sLmyB/PtseD42rIzGPgC6s4cBRV+Aed8YTHYpWAgC8M5/C/bJHJoCgtoPnyastsA8NZcwZEFzvIYAr4lIh6gWz7UCScWAJGYWFx3j8ARO8VHr1EdxAWMxkKUwWEEJ/vQtNAxdGGbz5OUpQMsCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEANToHxCxJGVHs4SKRksjfcEJVDN2eFmeZtHWh84EPr8Rswb4P0A8ldzC8sXrGzdjyL/yj/lYMEHaZHWzMdiGAFDh0gUKclm/Xy5f0HBXZ6jo+KmbJhau7G7eLQCsqb2zlgcNlMVExlQHVfmUU9WWA3pDBLlb3sX/74wJKSQ+Mz4l9suPXF8l8CmR/0GqFGS0om0EcO3WgpaUMlD6jrZchm+HUUy1JBHEK49s653htTiu1Cs5Cn4AJDIYqfT150622uH7oEw7joSF/GeX495rgWL7YfkZeGPXsxdNbQ5BIyX0DPwCxgT/ANG+7+h0rMMFZtc9QZjAy95frZcxVPft4gQ=="
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