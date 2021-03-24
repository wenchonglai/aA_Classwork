import React from 'react';
import Board from './board'
import * as MineSweeper from '../minesweeper';

export default class Game extends React.Component{
  constructor(props){ super(props);
    this.state = {board: new MineSweeper.Board()}
    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(){

  }

  render(){
    return (<div className='react-game'>
      <Board board={this.state.board} updateGame={this.updateGame}></Board>
    </div>)
  }
}