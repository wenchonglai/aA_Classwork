export const allTodos = ({todos}) => {
  return Object.values(todos);
};

export const allSteps = ({steps}) => {
  return Object.values(steps);
}

export const stepsByTodoId = ({steps}, todoId) => {
  return Object.values(steps).filter((ele) => ele.todo_id === todoId);
}



export default {};