import React from 'react'
import './Cell.css'

export default function Cell(props) {
  return (
    <button className='cell' onClick={props.onClick}>{props.value}</button>
  )
}
