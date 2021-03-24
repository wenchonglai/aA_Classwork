import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './frontend/clock'
import Tabs from './frontend/tabs'
import Weather from './frontend/weather'

function Root(props){
  return (<div>
    <Clock />
    <Tabs data={props.data}/>
    <Weather />
  </div>)
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  ReactDOM.render(
    <Root data={[
      {title: 'one', content: 'I am the first'},
      {title: 'two', content: 'second pane here'},
      {title: 'three', content: 'third pane here'},
    ]}/>,
  root);
});
