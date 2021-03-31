import {RECEIVE_MOVES} from '../actions/move_actions';


export default function moveReducer(state = {}, action){
  Object.freeze(state);

  let newState = Object.assign({}, state);

  switch (action.type){
    case RECEIVE_MOVES: 
      return action.moves;
    default: return state;
  }
}