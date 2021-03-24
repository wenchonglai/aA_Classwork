import React from 'react'

export default class ReactTile extends React.Component{
  handleClick(e, is_flagging = false){
    e.preventDefault();
    this.props.updateGame(this.props.tile, is_flagging);
  }

  render(){
    let {tile} = this.props;
    let {bombed, explored, flagged} = tile;
    let extraClassName = ['bombed', 'explored', 'flagged']
          .map(key => tile[key] ? key : "").join(" ");
    let bombCount = tile.adjacentBombCount();
    return (
      <div 
        style={this.props.style}
        className={`tile ${extraClassName}`}
        onClick={(e) => this.handleClick(e)}
        onContextMenu={(e) => this.handleClick(e, true)}
      > 
        <p>
          {bombCount === 0 ? '': bombCount.toString()}
        </p>
      </div>
    )
  }
}
