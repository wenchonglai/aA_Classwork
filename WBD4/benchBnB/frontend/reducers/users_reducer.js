import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_ERRORS, receiveCurrentUser, logoutCurrentUser, receiveErrors } from "../actions/session_actions"

export default function usersReducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user})
    default:
      return state;

  }


}