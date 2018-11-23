import { combineReducers } from 'redux';

//Reducers
import appInterface from './appInterface';
import signup from './signup';
import signin from './signin';
import session from './session';
// --pages
import homePage from './homePage';
import userPage from './userPage';

export default combineReducers({
    appInterface,
    auth: combineReducers({
        signin,
        signup,
        session
    }),
    pages: combineReducers({
        homePage,
        userPage
    })
});