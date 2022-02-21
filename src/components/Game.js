import {React, useState, useEffect, useRef} from 'react';
import Board from './Board';
import InitGame from './InitGame';
import { isWinner } from '../winnerCalculation';
import Confetti from 'react-confetti';
import winnerAudio from '../sounds/winner.mp3';
import hitOneAudio from '../sounds/hit1.mp3';
import hitTwoAudio from '../sounds/hit2.mp3';
import './Game.css';

export default function Game() {
const [gameOn, setGameOn] = useState(false);
const [showBoard, setShowBoard] = useState(false);
const [showLogin, setShowLogin] = useState(true);
const [startSound, setStartSound] = useState(false);
const [boardSize, setBoardSize] = useState(0);
const [board, setBoard] = useState([]);
const [width, setWidth] = useState(null);
const [height, setHeight]  = useState(null);
const [playerOne, setPlayerOne] = useState({ 
    name: '', 
    symbol: 'X'});
const [playerTwo, setPlayerTwo] = useState({ 
        name: '', 
        symbol: 'O' });
const [playerOneIsNext, setPlayerOneIsNext] = useState(true);
const confettiRef = useRef(null);

const arrayToMatrix = (array, columns) => Array(Math.ceil(array.length / columns)).fill('').reduce((acc, cur, index) => {
    return [...acc, [...array].splice(index * columns, columns)]
  }, [])


  const boardCopy = [].concat(...board); 
  const board2D = board.length ?  arrayToMatrix(boardCopy, Math.sqrt(boardCopy.length)) : [];
  const hasWinner = isWinner(board2D);

useEffect(() => {
    if (gameOn) {
        createCopyBoard();
        setShowBoard(true);
        setShowLogin(false);
    } else {
        setShowBoard(false);
        setShowLogin(true);
        setPlayerOneIsNext(true);
    }
}, [gameOn]);


useEffect(() => {
    if (confettiRef.current && confettiRef.current.clientHeight) {
        setHeight(confettiRef.current.clientHeight);
        setWidth(confettiRef.current.clientWidth);
    }
}, [])


const createCopyBoard = () => {
    const boardCopy = [].concat(...board); 
    setBoard(boardCopy);
}

const handleClick = (index) => {

    const boardCopy = createCopyBoard();
    createCopyBoard();
    if (hasWinner || board[index]) {
        return;
    }
    
    board[index] = playerOneIsNext ? playerOne.symbol : playerTwo.symbol;
    setBoard(board);
    setPlayerOneIsNext(!playerOneIsNext);
}



const clearBoard = () => {
    return (
        <button className='clearBtn' onClick={()=>setBoard(Array(Math.pow(boardSize, 2)).fill(''))}> Clear Board</button>
    )
}

const startNewGame = () => {
    return (
        <button className='startBtn' onClick={()=>setGameOn(false)}> Start New Game </button>
    )
}

const playWinnerAudio = () => {
    new Audio(winnerAudio).play();
  }

const playHitOneAudio = () => {
    new Audio(hitOneAudio).play();
  }

const playHitTwoWinnerAudio = () => {
    new Audio(hitTwoAudio).play();
  }

const displayPlayerOne = () => {
    playHitOneAudio();
    return playerOne.name
}
  
const displayPlayerTwo = () => {
    playHitTwoWinnerAudio();
    return playerTwo.name
}
  

return (
    <div className="wrapper" ref={confettiRef}>
        <h1 className='header'> Xs and Os </h1>
        {showLogin && (<InitGame setGameOn={setGameOn} setBoardSize={setBoardSize} 
            setBoard={setBoard} setPlayerOne={setPlayerOne} setPlayerTwo={setPlayerTwo} />)}
        {showBoard && startNewGame()}
        {showBoard && clearBoard()}
        {showBoard  && (<Board board={board} boardSize={boardSize} click={handleClick}/>)}
        {showBoard && (
             <p className='gameInfo'>
            {hasWinner  && ( <Confetti width={width} height={height}/>)}
            {hasWinner && gameOn && playWinnerAudio()}
            { hasWinner ? "The winner is " + (playerOneIsNext? playerTwo.name: playerOne.name): "It's " + (playerOneIsNext? displayPlayerOne(): displayPlayerTwo()) + " turn"}
        </p>)}

    </div>
  )
}
