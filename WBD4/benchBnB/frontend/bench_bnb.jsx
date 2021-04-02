import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from './components/root'
import {login, logout} from './actions/session_actions'

document.addEventListener("DOMContentLoaded", () =>{
  let store;
  
  if (window.currentUser){
    const preloadeState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser},
      },
      session: { id: window.currentUser.id }
    };

    store = configureStore(preloadeState);

    delete window.currentUser;
  } else {
    store = configureStore();
  }

  const root = document.getElementById('root');

  window.store = store;
  // store.dispatch(logout())
  // store.dispatch(login({username:"bunny", password:"123456"}));

  ReactDOM.render(<Root store={store}>React is working</Root>, root);
});