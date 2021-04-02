import {RECEIVE_TODO, RECEIVE_TODOS, REMOVE_TODO, CHANGE_TODO_STATUS} from '../actions/todo_actions'

const initialState = {
  1: {
    id: 1,
    title: "wash car",
    body: "with soap",
    done: false
  },
  2: {
    id: 2,
    title: "wash dog",
    body: "with shampoo",
    done: true
  }
};

const todosReducer = (state = initialState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TODO:;

    case RECEIVE_TODOS: {
      for (let todo of action.todos)
        newState[todo.id] = todo;
      
      return newState;
    };

    case CHANGE_TODO_STATUS: {
      newState[action.id].done = !newState[action.id].done;
      return newState;
    };

    case REMOVE_TODO: {
      delete newState[action.id];
      return newState;
    };

    default:
      return state;
  }
}



export default todosReducer;