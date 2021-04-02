export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const CHANGE_TODO_STATUS = "CHANGE_TODO_STATUS"

export const receiveTodos = (todos) => ({
    type: RECEIVE_TODOS,
    todos
});

export const receiveTodo = (todo) => ({
    type: RECEIVE_TODO,
    todos: [todo],
});

export const removeTodo = (id) => ({
    type: REMOVE_TODO,
    id
});

export const changeStatus = (id) => ({
    type: CHANGE_TODO_STATUS,
    id
});

export default {RECEIVE_TODOS, RECEIVE_TODO, REMOVE_TODO, receiveTodos, receiveTodo, removeTodo, changeStatus};




