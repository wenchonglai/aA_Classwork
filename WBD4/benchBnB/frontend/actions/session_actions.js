import {postSession, deleteSession, postUser} from '../utils/sessions'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  user: currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = (user) => (dispatch) =>
  postSession(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      errors => dispatch(receiveErrors(errors))
    );

export const logout = () => (dispatch) => 
  deleteSession()
    .then(
      () => dispatch(logoutCurrentUser()),
      errors => dispatch(receiveErrors(errors))
    );

export const signup = (user) => (dispatch) =>
  postUser(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      errors => dispatch(receiveErrors(errors))
    );
