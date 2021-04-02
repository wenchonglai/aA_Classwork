import TodoList from './todo_list';
import {connect} from 'react-redux';
import {allTodos} from '../../reducers/selectors';
import TodoActions from '../../actions/todo_actions';

const mapStateToProps = (state) => ({
  todos: allTodos(state)
});

const mapDispatchToProps = (dispatch) => ({
  receiveTodoHandler: (todo) => dispatch(TodoActions.receiveTodo(todo)),
  changeStatusHandler: (id) => dispatch(TodoActions.changeStatus(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);