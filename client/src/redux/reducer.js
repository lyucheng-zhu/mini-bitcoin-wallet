import { combineReducers } from 'redux';
import search from './reducers/search';
import auth from './reducers/auth';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  search,
  auth,
  common,
  router: routerReducer
});
