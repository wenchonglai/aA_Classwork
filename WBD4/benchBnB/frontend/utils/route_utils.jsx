import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router";

const mapSTP = (state) => ({
  logged_in: !!state.session.id
});

const Auth = function({logged_in, path, component: Component}){
  return (
    <Route path={path} render={ (props) =>
      ( logged_in ? <Redirect to='/' /> : <Component {...props}/> )
    }/>
  );
}

const Protected = function({logged_in, path, component: Component}){
  return (
    <Route path={path} render={ (props) =>
      ( logged_in ? <Component {...props}/> : <Redirect to='/login' /> )
    }/>
  );
}

export const AuthRoute = withRouter(connect(mapSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected));