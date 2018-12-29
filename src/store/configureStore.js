import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import pttReducer from './reducers/ptt.reducer'
import userReducer from './reducers/user.reducer'
import { reducer as formReducer } from 'redux-form'


import { routerMiddleware } from 'connected-react-router'
import { connectRouter } from 'connected-react-router'




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

// const history = createBrowserHistory()

export default (history) => {
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ptt: pttReducer,
      user: userReducer,
      form: formReducer
    }),
    composeEnhancers(applyMiddleware(routerMiddleware(history),thunk))
  );

  return store;
};
