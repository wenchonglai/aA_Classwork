import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import App from './app';
import {requestPokemon} from './actions/pokemon_actions'

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  const store = configureStore();

  window.store = store;

  store.dispatch(requestPokemon(22));

  ReactDOM.render(<Root store={store} />, rootEl);
})