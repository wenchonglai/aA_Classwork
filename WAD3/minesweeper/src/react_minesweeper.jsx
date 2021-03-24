import React from 'react'
import Game from './components/game'

export default class ReactGamesweeper extends React.Component{
  constructor(props){ super(props);

  }
  render(){
    return (
    <React.Fragment>
      <Game></Game>
    </React.Fragment>
    )
  }
}