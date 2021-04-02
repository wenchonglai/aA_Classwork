import {RECEIVE_STEPS, RECEIVE_STEP, REMOVE_STEP, UPDATE_STEP_STATUS, receiveSteps, receiveStep, removeStep} from '../actions/step_actions'

const STEPS_INITIAL_STATE = {
  1: { // this is the step with id = 1
    id: 1,
    title: 'walk to store',
    done: false,
    todo_id: 1
  },
  2: { // this is the step with id = 2
    id: 2,
    title: 'buy soap',
    done: false,
    todo_id: 1
  }
}

const stepsReducer = (state = STEPS_INITIAL_STATE, action) => {
  Object.freeze(state);
  
  const newState = Object.assign({}, state);

  switch (action.type){
    case RECEIVE_STEPS:;

    case RECEIVE_STEP: {
      for (let step of action.steps)
        newState[step.id] = step;

      return newState;
    };

    case UPDATE_STEP_STATUS: {
      newState[action.id] = !newState[action.id].done;
      return newState;
    };

    case REMOVE_STEP: {
      delete newState[action.id];
      return newState;
    };

    default: return state;
  }
}

export default stepsReducer;