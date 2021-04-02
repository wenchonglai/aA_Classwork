import {connect} from 'react-redux';
import StepListItem from './step_list_item';
import StepActions from '../../actions/step_actions'

const mapDispatchToProps = (dispatch) => ({
  removeStepHandler: id => dispatch(StepActions.removeStep(id)),
  receiveStepHandler: step => dispatch(StepActions.receiveStep(step)),
  updateStepStatusHandler: id => dispatch(StepActions.updateStepStatus(id))
});

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StepListItem);