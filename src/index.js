import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';

import AppRouter from './routers/AppRouter'

import './config.js'

import configureStore from './store/configureStore'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
 

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

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})


const jsx = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AlertProvider template={AlertTemplate} {...options}>
          <AppRouter />
        </AlertProvider>
      </ConnectedRouter>

    </Provider>
  </MuiThemeProvider>

);

ReactDOM.render(jsx, document.getElementById('root'));

