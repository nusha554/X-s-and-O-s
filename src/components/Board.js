import React from 'react'
import './Board.css'
import Cell  from './Cell'

export default function Board({board, boardSize, click}) {
    return (
    <div className='board' style={{ width: boardSize * 100, height:  boardSize * 100}}>
        {
            [...board].map((cell, i) =>  <Cell key={i} value={cell} onClick={() => click(i)}/>)
        }
    </div>
    )
}

