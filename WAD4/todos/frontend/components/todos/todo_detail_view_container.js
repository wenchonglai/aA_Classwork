import React from 'react';
import {connect} from 'react-redux';
import TodoDetailView from './todo_detail_view';
import {allSteps} from '../../reducers/selectors';
import StepActions from '../../actions/step_actions';
import TodoActions from '../../actions/todo_actions';



const mapDispatchToProps = dispatch => ({
  receiveStepHandler: step => dispatch(StepActions.receiveStep(step)),
  removeStepHandler: id => dispatch(StepActions.removeStep(id)),
  removeTodoHandler: (id) => dispatch(TodoActions.removeTodo(id))
})


export default connect(null, mapDispatchToProps)(TodoDetailView);