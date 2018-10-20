import { combineReducers } from 'redux';

//Reducers
import page from './page';
import signup from './signup';
import signin from './signin';
import session from './session';
import auth from './auth'

export default combineReducers({
    page,
    auth: combineReducers({
        signin,
        signup,
        session
    })
    // auth
});