import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import scheduleReducer from '../scheduleToday/reducers';

const store = createStore(scheduleReducer, applyMiddleware(thunk));

export default store;
