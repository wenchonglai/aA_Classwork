////

import React from 'react'

const APIUtil = function(location = 'los angeles', key = '91c0e15f511a9de3084c81205a9afa07'){
  return $.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`
  });
};

export default class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state = {data: {}, name: '', weather: {}};
  }
  
  getWeather(){
    APIUtil().then(result => {
      console.log(result.weather);
      this.setState({data: result.main, name: result.name, weather: result.weather[0]});
    })
  }
  componentDidMount(){
    this.getWeather();

    this.interval = setInterval( () => {
      this.getWeather();
    }, 900000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getWeatherEmoji(str){
    switch (str){
      case 'Clear': {return '🌞'; }; break;
      case 'Clouding': {return '🌤'; }; break;
      case 'Raining': {return '🌦'; }; break;
      case 'Shower': {return '🌧'; }; break;
    }
  }

  render(){
    return (<div className='weather'>
      <h1>Weather</h1>
      <div className='weather-container'>
        <div className='left'>
          <div className='location'>{this.state.name}</div>
          <h2 className='temp temp-curr'>{Number(this.state.data.temp).toFixed(1)}</h2>
        </div>
        <div className='right'>
          <h2>{this.getWeatherEmoji(this.state.weather.main)}</h2>
          <div className='temp temp-min'>{
            `H: ${Number(this.state.data.temp_min).toFixed(1)}`}</div>
          <div className='temp temp-max'>{
            `L: ${Number(this.state.data.temp_max).toFixed(1)}`}
          </div>
        </div>
      </div>
    </div>);
  }
}