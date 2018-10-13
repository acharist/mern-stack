import { combineReducers } from 'redux';

//Reducers
import page from './page';
import signup from './signup';
import signin from './signin';

export default combineReducers({
    page,
    signup,
    signin
});