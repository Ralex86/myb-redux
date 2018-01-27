import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import user from './reducers/userReducer';
import events from './reducers/eventsReducer';
import assets from './reducers/assetsReducer';
import view from './reducers/viewReducer';

export default createStore(
  combineReducers({
    user,
    events,
    assets,
    view,
  }),
  {},
  applyMiddleware(logger, thunk)
);
