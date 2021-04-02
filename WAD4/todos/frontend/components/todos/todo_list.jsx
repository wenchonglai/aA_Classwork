import React from 'react';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';

export default ({todos, receiveTodoHandler, removeTodoHandler, changeStatusHandler, ...props}) => {

  return (
    <section className='todo-list'>
      <ul>
        { todos.map( todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            removeTodoHandler={removeTodoHandler}
            changeStatusHandler={changeStatusHandler}
          />
        ) ) }
      </ul>
      <TodoForm receiveTodoHandler={receiveTodoHandler}/>
    </section>
  );
}