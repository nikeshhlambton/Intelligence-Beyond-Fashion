// src/reducers/index.js
import { combineReducers } from 'redux';
import trendsReducer from './trendsSlice';

const rootReducer = combineReducers({
  trends: trendsReducer,
});

export default rootReducer;
