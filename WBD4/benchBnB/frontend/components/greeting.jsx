import React from 'react';
import {Link} from 'react-router-dom';

class Greeting extends React.Component{

  render(){
    let {user, logout} = this.props;
    
    return (
      <div>
        { user ? ( 
            <div>
              {`Welcome, ${user.username}`}
              <button onClick={() => logout()}>
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log In</Link>
            </div>
          )
        }
      </div>
      )
  }
}

export default Greeting;