import React from 'react'
import ReactTile from './tile'

export default class ReactBoard extends React.Component{
  constructor(props){super(props);
    console.log(props.board)
  }
  render(){
    let {board} = this.props;

    return (
      <div className='board'
        style={{
          width: 24*board.gridSize + 'px',
          height: 24*board.gridSize + 'px'
        }}
      >
        {board.grid.map((row, i) => (
          <div className='row' key={i}
            style={{width: 24*board.gridSize + 'px'}}
          >
            {row.map((tile, j) => (
              <ReactTile
                tile={tile}
                key={`${i}-${j}`}
                updateGame={this.props.updateGame}
                style={{
                  width: '24px',
                  height: '24px'
                }}
              ></ReactTile>
            ))}
          </div>
        ))}
      </div>
    )
  }
}