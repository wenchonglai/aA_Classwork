import {combineReducers} from 'redux';
import pokemonReducer from './pokemon_reducer';
import itemReducer from './item_reducer';
import moveReducer from './move_reducer';

const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
  moves: moveReducer,
  items: itemReducer
})

export default entitiesReducer;