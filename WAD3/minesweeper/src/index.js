import ReactMinesweeper from './react_minesweeper';
import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', e => {
  let root = document.getElementById('root');

  ReactDOM.render(<ReactMinesweeper></ReactMinesweeper>, root);
});