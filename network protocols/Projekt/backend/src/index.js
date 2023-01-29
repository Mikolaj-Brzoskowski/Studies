const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());

require('dotenv').config();

const dbConnData = {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'protokoly',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password'
};

const { Client } = require('pg')
const client = new Client(dbConnData)

client
    .connect()
    .then(() => {
        console.log('Connected to PostgresSQL');
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Connection error', err.stack));

//roomnames

app.get('/roomnames', async (req, res) => {
    const response = await client.query('SELECT * FROM "roomnames"')
    return res.send(response.rows)
})

app.post('/roomnames', async (req, res) => {
    const response = await client.query(`INSERT INTO "roomnames" (roomname)
    VALUES ('${req.body.roomname}') RETURNING ID`)
    return res.send(response.rows)
})

app.patch('/roomnames/:id', async (req, res) => {
    const roomname = req.body.roomname
    const id = req.params.id
    await client.query(`UPDATE roomnames SET roomname = '${roomname}'::character varying WHERE id=${id}`)
    return res.send({
        updatedID: id,
        roomname
    })
})

app.patch('/roomnames/:id/hidden/:boolean', async (req, res) => {
    const bool = req.params.boolean
    const id = req.params.id
    await client.query(`UPDATE roomnames SET hidden = ${bool}::boolean WHERE id = ${id}`)
    return res.send({
        updatedID: id
    })
})

app.delete('/roomnames/:id', async (req, res) => {
    const id = req.params.id
    await client.query(`DELETE FROM "roomnames" WHERE id=${id}`)
    return res.send({
        deletedID: id
    })
})

//users in roomnames

app.get('/usernames/:id', async (req, res) => {
    const id = req.params.id
    const response = await client.query(`SELECT firstplayer, secondplayer FROM "roomnames" WHERE id=${id}`)
    return res.send(response.rows)
})

app.post('/usernames/:id', async (req, res) => {
    const id = req.params.id
    await client.query(`DO
    $do$
    BEGIN
    IF (SELECT firstplayer FROM roomnames WHERE id=${id}) IS NULL THEN 
        UPDATE roomnames SET firstplayer = '${req.body.player}'::character varying WHERE id=${id};
        UPDATE roomnames SET secondplayer = NULL WHERE id=${id};
        ELSE 
            IF (SELECT secondplayer FROM roomnames WHERE id=${id}) IS NULL AND
            (SELECT firstplayer FROM roomnames WHERE id=${id}) != '${req.body.player}'::character varying THEN
            UPDATE roomnames SET secondplayer = '${req.body.player}'::character varying WHERE id=${id};
            END IF;
        END IF;
    END
    $do$`)
    return res.send({
        postedOnID: id,
        body: req.body
    })
})

app.patch('/usernames/:id', async (req, res) => {
    const id = req.params.id
    const username = req.body.username
    await client.query(`DO
    $do$
    BEGIN
    IF (SELECT firstplayer FROM roomnames WHERE id=${id}) = '${username}'::character varying THEN
    UPDATE roomnames SET firstplayer = NULL WHERE id=${id};
    ELSE IF (SELECT secondplayer FROM roomnames WHERE id=${id}) = '${username}'::character varying THEN
    UPDATE roomnames SET secondplayer = NULL WHERE id=${id};
    END IF;
    END IF;
    END
    $do$`)
    return res.send({
        deletedFromId: id,
        body: req.body
    })
})

//logs

app.post('/logs/chat', async (req, res) => {
    const msg = req.body.message
    const username = req.body.username
    const roomname = req.body.roomname
    await client.query(`INSERT INTO chat_logs (message, username, roomname) VALUES ('${msg}', '${username}', '${roomname}')`)
})

app.post('/logs/players', async (req, res) => {
    const action = req.body.action
    const username = req.body.username
    const roomname = req.body.roomname
    await client.query(`INSERT INTO players_logs (username, action) VALUES ('${username}', '${action}')`)
})

//players

app.get('/players', async (req, res) => {
    const username = req.body.username
    const response = await client.query(`SELECT * FROM players_database`)
    return res.send(response.rows)
})

app.get('/players/username/:username', async (req, res) => {
    const username = req.params.username
    const response = await client.query(`SELECT id FROM players_database WHERE username = '${username}'`)
    return res.send(response.rows)
})

app.get('/players/id/:id', async (req, res) => {
    const id = req.params.id
    const response = await client.query(`SELECT username FROM players_database WHERE id = '${id}'`)
    return res.send(response.rows)
})

app.post('/players', async (req, res) => { 
    const username = req.body.username
    const result = await client.query(`SELECT * FROM players_database WHERE username = '${username}'`)
    if (result.rows.length > 0) {
        return res.send('User already exists')
    }
    else {
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await client.query(`INSERT INTO players_database (username, password) VALUES ('${req.body.username}', '${hashedPassword}') RETURNING ID`)
        return res.send(response.rows)
    }
})

app.patch('/players/:id', async (req, res) => {
    const id = req.params.id
    await client.query(`UPDATE players_database SET username = '${req.body.username}'::character varying WHERE id = ${id}`)
    return res.send({
        updatedID: id
    })
})

app.delete('/players/:id', async (req, res) => {
    const id = req.params.id
    await client.query(`DELETE FROM players_database WHERE id = ${id}`)
    return res.send({
        deletedID: id
    })
})

//login

app.get('/login', async (req, res) => {
    const username = req.query.username
    const result = await client.query(`SELECT * FROM players_database WHERE username = '${username}'`)
    if (result.rows.length == 1) {
        const password = req.query.password
        const matchPassword = await bcrypt.compare(password, result.rows[0].password)
        if (matchPassword){
            return res.send('User logged')
        }
        else {
            return res.send('Wrong password')
        }
    }
    else {
        return res.send('User does not exist')
    }
})

//comments

app.get('/comments/:id', async (req, res) => {
    const id = req.params.id
    const result = await client.query(`SELECT * FROM comments WHERE displayonuserid = '${id}'`)
    return res.send(result.rows)
})

app.post('/comments/:id', async (req, res) => {
    const id = req.params.id
    const userID = req.body.postedbyuserid
    const comment = req.body.comment
    const username = req.body.postedbyusername
    await client.query(`INSERT INTO comments (comment, postedbyuserid, displayonuserid, postedbyusername) VALUES ('${comment}', '${userID}', '${id}', '${username}')`)
    return res.send({
        postedOnID: id,
        body: req.body
    })
})

app.patch('/comments/:commentid', async (req, res) => {
    const commentid = req.params.commentid
    const comment = req.body.comment
    await client.query(`UPDATE comments SET comment = '${comment}'::character varying WHERE id = ${commentid}`)
    return res.send({
        updatedID: commentid
    })
})

app.delete('/comments/:commentid', async (req, res) => {
    const commentid = req.params.commentid
    await client.query(`DELETE FROM comments WHERE id = ${commentid}`)
    return res.send({
        deletedID: commentid
    })
})