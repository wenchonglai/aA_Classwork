import {RECEIVE_ITEMS} from '../actions/item_actions';

export default function itemReducer(state = {}, action){
  Object.freeze(state);

  let newState = Object.assign({}, state);

  switch (action.type){
    case RECEIVE_ITEMS: 
      return action.items;
    default: return state;
  }
}