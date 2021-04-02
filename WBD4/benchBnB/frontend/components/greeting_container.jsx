import {connect} from 'react-redux';
import Greeting from './greeting';
import {logout} from '../actions/session_actions'

const MAPSTP = (state, ownProps) => ({
  user: state.entities.users[state.session.id]
});

const MAPDTP = (dispatch, ownProps) => ({
  logout: () => dispatch(logout())
});

export default connect(MAPSTP, MAPDTP)(Greeting);