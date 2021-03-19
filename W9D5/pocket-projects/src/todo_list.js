const TODOS = JSON.parse(localStorage.getItem('todos')) || [];
const ul = document.querySelector('ul.todos');

let counter = (function(){
  let count = 0;

  return () => (count++);
})();

export default function addTodo(){
  // let button = document.querySelector('input[value="+ Add Todo"]');
  let form = document.querySelector('form.add-todo-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let input = document.querySelector('input[name="add-todo"]');
    let todo = [input.value, false];

    input.value = '';

    TODOS.push(todo);
    localStorage.setItem('todos', JSON.stringify(TODOS));
    populateList(todo, TODOS.length - 1);
  });
};

function populateList([item, checked], i){
  let li = document.createElement('li');
  let label = document.createElement('label');
  let checkbox = document.createElement('input');
  checkbox.setAttribute('data-index', i);
  checkbox.setAttribute('type', 'checkbox');

  if (checked){
    checkbox.checked = true;
  }

  label.appendChild(checkbox);
  label.append(item);
  li.appendChild(label);
  ul.appendChild(li);
}

TODOS.forEach((todo, i) => {
  populateList(todo, i);
});

const checkHandler = e => {
  let index = e.target.getAttribute('data-index');
  
  if (index === null){ return; }

  TODOS[index][1] = !TODOS[index][1];
  localStorage.setItem('todos', JSON.stringify(TODOS));
};

ul.addEventListener('click', checkHandler);

addTodo();


