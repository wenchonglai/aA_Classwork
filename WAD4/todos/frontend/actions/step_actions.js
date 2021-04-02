export const RECEIVE_STEPS = 'RECEIVE_STEPS';
export const RECEIVE_STEP = 'RECEIVE_STEP';
export const REMOVE_STEP = 'REMOVE_STEP';
export const UPDATE_STEP_STATUS = 'UPDATE_STEP_STATUS';

export const receiveSteps = (steps) => ({
  type: RECEIVE_STEPS,
  steps
})

export const receiveStep = (step) => ({
  type: RECEIVE_STEP,
  steps: [step]
})

export const removeStep = (id) => ({
  type: REMOVE_STEP,
  id: id
});

export const updateStepStatus = (id) => ({
  type: UPDATE_STEP_STATUS,
  id
});

export default {receiveSteps, receiveStep, removeStep, updateStepStatus};