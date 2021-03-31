import React from 'react'
import {HashRouter, Route} from "react-router-dom";
import PokemonIndexContainer from './components/pokemon/pokemon_index_container'

const App = () => (
  <Route path='/' component={PokemonIndexContainer}></Route>
);

export default App;
