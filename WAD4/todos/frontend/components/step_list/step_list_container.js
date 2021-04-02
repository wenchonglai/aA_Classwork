import {connect} from 'react-redux';
import StepList from './step_list';
import StepActions from '../../actions/step_actions';
import {stepsByTodoId} from '../../reducers/selectors';

const mapDispatchToProps = (dispatch) => ({
  receiveStepHandler: step => dispatch(StepActions.receiveStep(step))
});

function mapStateToProps(state, {id}) {
  return {steps: stepsByTodoId(state, id)};
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);