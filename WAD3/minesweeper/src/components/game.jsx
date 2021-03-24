import React from 'react';
import ReactBoard from './board'
import * as MineSweeper from '../minesweeper';

class Modal extends React.Component{
  constructor(props){ super(props);
    this.state = {hidden: false};
  }
  handleClick(e){
    e.preventDefault();
    this.setState({hidden: true}, () => {console.log(this.state.hidden)});
  }
  render(){
    return (
      <div className={`modal ${this.state.hidden ? 'hidden' : ''}`}>
        <div className='modal-screen'></div>
        <div className='modal-window'>
          <p>{this.props.message}</p>
          <form action={window.location.href}>
            <button>Play Again!</button>
          </form>
          <span onClick={(e) => this.handleClick(e)}>x</span>
        </div>
      </div>
    )
  }
}

export default class Game extends React.Component{
  constructor(props){ super(props);
    this.state = {board: new MineSweeper.Board(10, 10)};
    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(tile, is_flagging = false){
    tile[is_flagging ? 'toggleFlag' : 'explore']();
    let won = this.state.board.won();
    let lost = this.state.board.lost();

    if (won || lost){
      this.state.board.grid.forEach(row => {
        row.forEach(tile => {
          if (!tile.flagged)
            tile.explored = true;
        })
      });

      this.setState({
        board: this.state.board,
        message: `you ${won ? 'won' : 'lost'}!`
      });
    } else {
      this.setState({board: this.state.board});
    }

  }

  render(){
    return (<div className='react-game'>
      <h1>Minesweeper</h1>
      <ReactBoard board={this.state.board} updateGame={this.updateGame}></ReactBoard>
      { this.state.message ? 
        (<Modal message={this.state.message}></Modal>) :
        <React.Fragment></React.Fragment>
      }
      
    </div>)
  }
}
