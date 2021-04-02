import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from './components/root'
import {login, logout} from './actions/session_actions'

document.addEventListener("DOMContentLoaded", () =>{
  const store = configureStore();

  window.store = store;
  // store.dispatch(logout())
  // store.dispatch(login({username:"bunny", password:"123456"}));

  ReactDOM.render(
    <Root store={store}>React is working</Root>,
    document.getElementById('root')
  );
});