import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authors from './authors';
import works from './works';

export default combineReducers({
  authors,
  works,
  router: routerReducer
})