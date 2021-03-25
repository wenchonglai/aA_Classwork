import './object-enhancer'
import applyMiddleWare from './apply-middleware'

export default class Store{
  constructor(rootReducer, combinedMiddleware = applyMiddleWare()){
    this.rootReducer = rootReducer;
    this.state = {}
    this.subscriptions = new Set();
    this.appliedMiddleware = combinedMiddleware;
  }

  getState(){
    return this.state.deepDup();
  }

  dispatch(action){
    let newState = this.appliedMiddleware(this, this.rootReducer)(action);

    if (!newState.shallowEqual(this.state)){
      this.subscriptions.forEach(callback => callback(newState));
      this.state = newState;
    }
  }

  subscribe(callback){
    this.subscriptions.add(callback);

    return () => {
      this.subscriptions.delete(callback);
    }
  }
}