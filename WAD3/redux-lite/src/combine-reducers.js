import './object-enhancer'

export default function combineReducers(reducerBundle){
  return function reducer(state, action, subscriptions){
    Object.freeze(state);

    let newState = state.deepDup();

    for (let [key, reducer] of Object.entries(reducerBundle)){
      newState[key] = reducer(newState[key] || {}, action, subscriptions);
    }

    return newState;
  }
}

