import { combineReducers } from 'redux';

//Reducers
import appInterface from './appInterface';
import signup from './signup';
import signin from './signin';
import session from './session';
import createPost from './createPost';
import deletePost from './deletePost';

// --pages
import homePage from './homePage';
import user from './user';

export default combineReducers({
    appInterface,
    auth: combineReducers({
        signin,
        signup,
        session
    }),
    pages: combineReducers({
        homePage,
        userPage: combineReducers({
            user,
            post: combineReducers({
                create: createPost,
                delete: deletePost 
            })
        })
    })
});