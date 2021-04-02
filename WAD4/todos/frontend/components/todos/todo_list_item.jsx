import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container'

export default function({todo, changeStatusHandler}) {
  const {id, title, body, done} = todo;
  const [hidden, setHidden] = React.useState(true)
  

  function handleChange(id) {
    changeStatusHandler(id);
  }

  function handleDetail() {
    setHidden(!hidden);
  }

  let checked = done ? "checked" : '';

  return (
    <li>
      <h4 onClick={() => handleDetail()}>
        {title}
      </h4>
      <label>
        <input type="checkbox" onChange={() => handleChange(id)} checked={checked}/>
        Done!
      </label>
        <button onClick={() => handleChange(id)} className={`status ${done ? 'done' : ''}`}></button>

      <TodoDetailViewContainer id={id} body={body} hidden={hidden}/>
    </li>
  );
};