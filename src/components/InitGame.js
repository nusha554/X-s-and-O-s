import {React, useState, useEffect} from 'react';
import './InitGame.css';

const MAX_SIZE = 6;
const MIN_SIZE = 3;

export default function InitGame({setGameOn, setBoardSize, setBoard, setPlayerOne,setPlayerTwo}) {

//handle error
const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(event.target.boardSize.value) || 
        event.target.boardSize.value > MAX_SIZE || 
        event.target.boardSize.value < MIN_SIZE) {
        alert("Board size is number between 3 to 10");
        event.target.boardSize.value = "";
        return;
    }
    setGameOn(true);
    const boardSize = Number(event.target.boardSize.value);
    console.log(boardSize)
    setBoardSize(boardSize); 
    setBoard([...Array(boardSize)].map((row) => Array(boardSize).fill("")));
    setPlayerOne({name: event.target.playerOneName.value,  symbol: 'X'});
    setPlayerTwo({name: event.target.playerTwoName.value,  symbol: 'O'});
}

  return (
    <div className='initGame'>
        <form className='Login' onSubmit={handleSubmit}>
            <input required  type="text" placeholder="Player 1" name="playerOneName" />
            <input required  type="text" placeholder="Player 2" name="playerTwoName" />
            <input required type="text" placeholder="Board size (3 to 6)" name="boardSize" />
            <input type="submit" className='submitBtn' value="Submit" />
        </form>
    </div>
  )
}
