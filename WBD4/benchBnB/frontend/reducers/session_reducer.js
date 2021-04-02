import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_ERRORS, receiveCurrentUser, logoutCurrentUser, receiveErrors } from "../actions/session_actions"

const nullUser = Object.freeze({id: null})

export default function sessionReducer(state = nullUser, action){

  switch (action.type){
    case RECEIVE_CURRENT_USER:{
      return { id: action.user.id }
    }
    case LOGOUT_CURRENT_USER:
      return nullUser;
    default:
      return state
    
  }
}
