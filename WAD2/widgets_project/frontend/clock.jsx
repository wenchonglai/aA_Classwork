import React from 'react'

export default class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  
  componentDidMount(){
    this.interval = setInterval( () => this.tick(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  tick(){
    this.setState({date: new Date()});
  }

  render(){
    return (<div className='clock'>
      <h1>⏰ Clock</h1>
      <div className='clock-body'>
        <div className='clock-row'>
          <div>Time:</div>
          <div>{this.state.date.toDateString()}</div>
        </div>
        <div className='clock-row'>
          <div>Date:</div>
          <div>{this.state.date.toTimeString().split(' ')[0]}</div>
        </div>

      </div>
    </div>

    );
  }
}
