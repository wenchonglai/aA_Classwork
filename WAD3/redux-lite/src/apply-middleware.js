export default function applyMiddleWare(...middlewares){
  
  return (store, rootReducer) => (
    action => {
      const arr = [...middlewares];
      
      function invokeNextMiddleware(action){
        let middleware = arr.shift();
    
        if (middleware){
          return middleware(store)(invokeNextMiddleware)(action);
        } else {
          return rootReducer(store.getState(), action, store.subscriptions);
        }
      }

      return invokeNextMiddleware(action);
    }
  )
}