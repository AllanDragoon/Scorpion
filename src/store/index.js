import { combineReducers, createStore } from 'redux';
import ui from '../reducers/ui/index';

var store = createStore(
    combineReducers({ui})
);

export default store;