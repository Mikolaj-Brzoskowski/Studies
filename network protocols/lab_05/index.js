var express = require('express');
var app = express();
var readline = require('readline');


var server = app.listen(8080, "localhost", () => {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let workspace = ['-','-','-','-','-','-','-','-','-']
let currentPlayer = "X"
let moves = 0
let AImoveHistory = []
let playerMoveHistory = []

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

app.get('/', async (req, res) => {
    return res.end(`${workspace[0]}|${workspace[1]}|${workspace[2]}\n-----\n${workspace[3]}|${workspace[4]}|${workspace[5]}\n-----\n${workspace[6]}|${workspace[7]}|${workspace[8]}`)
})

app.post('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        if (workspace[id] === '-'){
            moves += 1
            workspace[id] = currentPlayer
            playerMoveHistory.push(id)
        }
        else {
            throw new Error("Error! Place already taken!")
        }
        if (moves != 5){
            let AInumber = getRandomInt(0,8)
            while (workspace[AInumber] !== '-') {
                AInumber = getRandomInt(0,8)
            }
            workspace[AInumber] = "O"
            AImoveHistory.push(AInumber)
        }
        return res.send(workspace)
    } catch (err){
        next(err)
    }
});

app.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        if (workspace[id] === '-'){
            moves += 1
            workspace[id] = currentPlayer
        }
        else {
            throw new Error("Error! Place already taken!")
        }
        if (moves != 5){
            let AInumber = getRandomInt(0,8)
            while (workspace[AInumber] !== '-') {
                AInumber = getRandomInt(0,8)
            }
            workspace[AInumber] = "O"
        }
        return res.send(workspace)
    } catch (err){
        next(err)
    }
});