import { combineReducers } from 'redux';

//Reducers
import page from './page';
import signup from './signup';

export default combineReducers({
    page,
    signup
});