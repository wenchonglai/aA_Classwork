import React from 'react';
import { Provider } from 'react-redux';
import {HashRouter, Route} from "react-router-dom";
import PokemonIndexContainer from './../components/pokemon/pokemon_index_container';
import App from '../app'

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App></App>
    </HashRouter>
  </Provider>
);

export default Root;