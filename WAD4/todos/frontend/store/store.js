import {createStore} from 'redux';
import rootReducer from '../reducers/root_reducer';

const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState);
}

export default configureStore;
