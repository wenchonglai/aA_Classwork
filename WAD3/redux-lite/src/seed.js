import Store from './store';
import combineReducers from './combine-reducers';
import applyMiddleWare from './apply-middleware';

// action creator
const addFruitCreator = function(fruit){
  return {type: 'add fruit', fruit};
}

// actions
let addBanana = { type: 'add fruit', fruit: 'banana'};
let addPineapple = addFruitCreator('pineapple'); // { type: 'add fruit', fruit: 'pineapple'};

// reducer
const fruitReducer = function(state, action, subscriptions){
  Object.freeze(state);
  let newState = state.deepDup();

  switch (action.type){
    case 'add fruit': {
      let fruitName = action.fruit;
  
      newState[fruitName] ||= 0;
      newState[fruitName]++;

      return newState;
    }
    case 'rot': return {};
    default: return state;
  }
}

const middleware1 = store => next => action => {
  console.log("Middleware 1!");
  return next(action);
}

const middleware2 = store => next => action => {
  console.log("Middleware 2!");
  return next(action);
}

const reduxLogger = store => next => action => {
  let res = next(action);
  console.log(`%coriginal state:`, "color: red", store.state, action, res);
  return res;
}

const reducer = combineReducers({fruit: fruitReducer});

let store = new Store(reducer, applyMiddleWare(reduxLogger));
let callback = function(state){console.log(state);}

store.dispatch(addBanana);
store.dispatch(addBanana);
store.dispatch(addBanana);
store.dispatch(addPineapple);

let revert = store.subscribe(callback);
store.dispatch(addFruitCreator('strawberry'));
store.dispatch({type: 'rot'});
store.dispatch({type: 'do nothing'})
store.dispatch(addBanana);

revert();
store.dispatch(addBanana);


// 2reducers
// both reducers take the same action type

export default {};

