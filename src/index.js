import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import './assets/styles/styles.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reducers from './reducers';
import mock from './__mock__';
import registerServiceWorker from './registerServiceWorker';

// 创建store
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware
    )
  )
)

// mock数据
mock.listen()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
