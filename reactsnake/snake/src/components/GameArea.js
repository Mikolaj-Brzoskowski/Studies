import '../App.css';
import React, {useState, useEffect} from 'react';
import Snake from './Snake.js';
import Mines from './Mines.js'
import Apple from './Apple.js';

function GameArea() {

  //variable that changes board size
  const GAME_AREA_SIZE = 20;

   //init values for snake
   const [snakeCells, setSnakeCells] = useState([
    {x: Math.floor(GAME_AREA_SIZE/2), y: Math.floor(GAME_AREA_SIZE/2)},
  ])

  function getRandomIntInclusive(a,b) {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    let x =  Math.floor(Math.random() * (max - min + 1)) + min;
    let y =  Math.floor(Math.random() * (max - min + 1)) + min;
    //check if object doesn't spawn with same coordinates as snake
    const checkCoordinates = () => {
      snakeCells.some(cell => {
        if (cell.x === x && cell.y === y) {
          x =  Math.floor(Math.random() * (max - min + 1)) + min;
          y =  Math.floor(Math.random() * (max - min + 1)) + min;
          checkCoordinates();
          return true;
        }
        return false;
      })
    }
    checkCoordinates();
    return {x, y};
  }

  //keys event enabler/disabler
  const [direction, setDirection] = useState('DOWN')
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onkeypress = (event) => {
    // eslint-disable-next-line default-case
    switch (event.keyCode) {
      case 37:
        if (direction !== 'RIGHT') setDirection('LEFT')
        break;
      case 38:
        if (direction !== 'DOWN') setDirection('UP')
        break;
      case 39:
        if (direction !== 'LEFT') setDirection('RIGHT')
        break;
      case 40:
        if (direction !== 'UP') setDirection('DOWN')
        break;
    }
  }

  const moveSnake = () => {
    let snakeCopy = [...snakeCells];
    let snakeHead = snakeCopy[snakeCopy.length - 1];
    // eslint-disable-next-line default-case
    switch (direction) {
      case 'LEFT':
        snakeHead = {x: (snakeHead.x - 1), y: snakeHead.y}
        break;
      case 'RIGHT':
        snakeHead = {x: (snakeHead.x + 1), y: snakeHead.y}
        break;
      case 'UP':
        snakeHead = {x: snakeHead.x, y: (snakeHead.y - 1)}
        break;
      case 'DOWN':
        snakeHead = {x: snakeHead.x, y: (snakeHead.y + 1)}
        break;
    }
    snakeCopy.shift();
    snakeCopy.push(snakeHead);
    setSnakeCells(snakeCopy);
  }

  useEffect (() => {
    document.addEventListener("keydown", onkeypress)
    return () => {
    document.removeEventListener("keydown", onkeypress) 
    }
  },[onkeypress])

  //rules mine that exists 30 seconds and end game when snake head crush into it

  const spawnMine = () => {
    setMineCells((prevState) => [...prevState, getRandomIntInclusive(0, GAME_AREA_SIZE-1)]) 
  }

  const [minesCells, setMineCells] = useState([])

  //init values for apple
  const initApple = () => {
    let coordinates = getRandomIntInclusive(0, GAME_AREA_SIZE-1)
    //check if apple doesn't spawn with same coordinates as mines
    const checkCoordinates = () => {
      minesCells.some(cell => {
        if (cell.x === coordinates.x && cell.y === coordinates.y) {
          coordinates = getRandomIntInclusive(0, GAME_AREA_SIZE-1)
          checkCoordinates();
          return true;
        }
        return false;
      })
    }
    checkCoordinates();
    return coordinates;
  }

  useEffect (() => {
    //rules - mine spawn after 30 seconds
    const minesTimer = setInterval(spawnMine, 30000)
    return () => {
      clearInterval(minesTimer);
    }
  },[])

  const [appleCell, setAppleCell] = useState(initApple());

  const respawnApple = () => {
    setAppleCell(initApple());
  }

  useEffect (() => {
    //rules - apple respawn after 10 seconds
    const appleTimer = setInterval(respawnApple, 10000)
    return () => {
      clearInterval(appleTimer);
    }
  },[])

  //snake speed
  const [snakeSpeed, setSnakeSpeed] = useState(1.5)

  //game area init
  const [area, setArea] = useState(
    new Array(GAME_AREA_SIZE).fill(0).map(column => new Array(GAME_AREA_SIZE).fill(0))
  );

  //score counter
  const [score, setScore] = useState(0)

  //reset game after breaking rule
  const resetGame = () => {
    setSnakeCells([
      {x: Math.floor(GAME_AREA_SIZE/2), y: Math.floor(GAME_AREA_SIZE/2)},
    ]);
    respawnApple();
    setSnakeSpeed(1.5);
    setScore(0);
    setMineCells([])
  }

  //rules - snake cant leave game area
  const checkBordersCrash = () => {
    const snakeHead = snakeCells[snakeCells.length - 1]
    if (snakeHead.x < 0 || snakeHead.x > GAME_AREA_SIZE - 1 || snakeHead.y < 0 || snakeHead.y > GAME_AREA_SIZE - 1) {
      alert("Game Over! You crashed into border of board.");
      resetGame();
    }
  }

  //rules - enlarge snake after eating apple
  const enlargeSnake = () => {
    let snakeCopy = [...snakeCells];
    snakeCopy.unshift([])
    setSnakeCells(snakeCopy);
  }

  //rules - snake can eat the apple
  const checkEatApple = () => {
    const snakeHead = snakeCells[snakeCells.length - 1]
    if (snakeHead.x === appleCell.x && snakeHead.y === appleCell.y) {
      enlargeSnake();
      respawnApple();
      //make snake fater after eating 5 apples
      if ((score+20) % 100 === 0 ) {
        setSnakeSpeed(snakeSpeed * 0.75)
      }
      setScore(score + 20)
    }
  }

  //rules - snake cant pass through himself
  const checkSnakeCrash = () => {
    const reversedList = [...snakeCells]
    reversedList.reverse();
    const head = reversedList[0];
    const tail = reversedList.slice(1);
    tail.forEach(cell => {
      if (cell.x === head.x && cell.y === head.y) {
        alert("Game Over! You crashed into your tail.");
        resetGame();
      }
    })
  }

  //rules - if snake crashes in mine, game over
  const checkMinesCrash = () => {
    const snakeHead = snakeCells[snakeCells.length - 1]
    minesCells.forEach(cell => {
      if (cell.x === snakeHead.x && cell.y === snakeHead.y) {
        alert("Game Over! You crashed into mine.");
        resetGame();
      }
    })
  }

  //activate rules for game
  useEffect (() => {
    checkBordersCrash();
    checkEatApple();
    checkSnakeCrash();
    checkMinesCrash();
    const interval = setInterval(moveSnake, 300 * snakeSpeed);
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="App">
      <div className="game-area">
      <Snake snakeCells={snakeCells}/>
      <Apple appleCell={appleCell}/>
      <Mines minesCells={minesCells}/>
      {area.map((column, x) => (
      <div className="column" key={x}>
        {column.map((square, y) => (
          <div className={`square`} key={y}/>
        ))}
        </div>
     ))}
      </div>
      <div>
      <p className="score">Score: {score}</p>
      </div>
    </div>
  );
}

export default GameArea;
