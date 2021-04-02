import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'
import {receiveTodo, receiveTodos, removeTodo} from './actions/todo_actions';
import {receiveStep, receiveSteps, removeStep} from './actions/step_actions'
import {allTodos} from './reducers/selectors'
import {stepsByTodoId} from './reducers/selectors'

window.store = configureStore({});
window.allTodos = allTodos;
window.stepsByTodoId = stepsByTodoId;

const newTodos = [{ id: 3, title: "wash cat", body: "with tea", done: false }, { id: 4, title: "get bitten by cat", body: "for insurance claims", done: true }];

// console.log(store.getState()); // should return default state object
store.dispatch(receiveTodo({ id: 3, title: "New Todo" }));
// console.log(store.getState()); // should include the newly added todo
store.dispatch(receiveTodos(newTodos));
// console.log(store.getState()); 
store.dispatch(removeTodo(3));
// console.log(store.getState());

const newSteps = [{ id: 3, title: "buy tea", body: "at store", done: false, todo_id: 1 }, { id: 4, title: "drink the tea", body: "forget your purpose", done: true, todo_id: 1 }];

store.dispatch(receiveStep({ id: 5, title: "New Step" }));
// console.log(store.getState()); 
store.dispatch(receiveSteps(newSteps));
// console.log(store.getState()); 
store.dispatch(removeStep(5));
// console.log(store.getState()); 

console.log(allTodos(store.getState()));

document.addEventListener('DOMContentLoaded',() => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/> ,root);
});