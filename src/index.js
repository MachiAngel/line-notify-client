import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'antd-mobile/dist/antd-mobile.css'
import AppRouter from './routers/AppRouter'

import './config.js'

import configureStore from './store/configureStore'

// U20c2fb6275968599930d9c307b5fe9d6


import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const history = createBrowserHistory()

const store = configureStore(history)


const options = {
  position: 'bottom center',
  timeout: 2000,
  offset: '30px',
  transition: 'scale'
}


const jsx = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AlertProvider template={AlertTemplate} {...options}>
        <AppRouter />
      </AlertProvider>
    </ConnectedRouter>
    
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));

